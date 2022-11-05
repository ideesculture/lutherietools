<template>
  <div class="about">
    <button v-if="micoff" v-on:click="openmic" id="recordButton">Record</button>
    <button v-if="micon" @click="startmic">Start</button>
    <button v-if="micon" @click="stopmic">Stop</button>
    <!--
    <br />
    <button v-if="micon" @click="stopdevicemic">StopDevice</button>
    <button v-if="micon" @click="playmic">Play</button>
    <button v-if="micon" @click="pausemic">Pause</button>
    <button v-if="micon" @click="toggleplaymic">togglePlay</button>
-->
    <div id="waveform"></div>

    <RecordingView
      v-for="(record, index) in storeRecords.records"
      :key="record.id"
      :title="record.title"
      :date="record.date"
      :audioUrl="record.audioB64"
			:audioB64="record.audioB64"
			@remove="removeRecord(index)"
    />
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/dist/plugin/wavesurfer.microphone";
import { useCounterStore } from "@/stores/counter";
import { useRecordsStore } from "@/stores/records";
import RecordingView from "./RecordingView.vue";

const storeCounter = useCounterStore();
const storeRecords = useRecordsStore();

export default {
  components: {
    RecordingView,
  },
  data() {
    return {
      count: 0,
      wavesurfer: null,
      microphone: {},
      context: {},
      processor: {},
      micon: false,
      micoff: true,
      mediaRecorder: null,
      audioChunks: [],
      storeCounter: storeCounter,
      storeRecords: storeRecords,
    };
  },
  methods: {
		removeRecord(index) {
			console.log("remove", index);
			storeRecords.removeRecordByIndex(index);
		},
    increment() {
      this.count++;
    },
    openmic() {
      this.micon = true;
      this.micoff = false;
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.processor = this.context.createScriptProcessor(1024, 1, 1);
      if (!this.wavesurfer) {
        this.$nextTick(() => {
          this.wavesurfer = WaveSurfer.create({
            container: "#waveform",
            waveColor: "black",
            interact: false,
            cursorWidth: 0,
            audioContext: this.context || null,
            audioScriptProcessor: this.processor || null,
            plugins: [Microphone.create()],
          });
          //this.wavesurfer.load("/src/assets/test.mp3");
          this.wavesurfer.microphone.on("deviceReady", function (stream) {
            console.info("Device ready!");
            console.info(stream);
            let mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];
            //console.log(mediaRecorder);
            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", (event) => {
              audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener("stop", () => {
              console.log("stop");
              const audioBlob = new Blob(audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.play();
              storeRecords.addRecord("Sans titre...", "date", audioBlob);
            });
          });
          this.wavesurfer.microphone.on("deviceError", function (code) {
            console.warn("Device error: " + code);
          });
          this.wavesurfer.microphone.start();
        });
      }
    },

    startmic() {
      this.wavesurfer.microphone.start();
    },
    stopdevicemic() {
      this.wavesurfer.microphone.stopDevice();
    },
    playmic() {
      this.wavesurfer.microphone.play();
    },
    pausemic() {
      this.wavesurfer.microphone.pause();
    },
    stopmic() {
      this.wavesurfer.microphone.stop();
    },
    toggleplaymic() {
      this.wavesurfer.microphone.togglePlay();
    },
  },
  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`);
    this.micon = false;
    this.micoff = true;
  },
};
</script>

<style scoped>
.audioRecordLi {
  list-style-type: none;
  display: block;
  padding: 12px;
  background-color: #d8d8d8;
  border-radius: 10px;
}
.audioRecordLi .title {
  font-weight: bold;
  color: green;
  font-size: 20px;
}
.audioRecordLi .date {
  display: inline-block;
  float: right;
}
.audioRecordLi audio {
  width: 100%;
}
</style>
