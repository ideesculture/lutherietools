<template>
  <div id="top">
    <div ref="wave2" id="wave2"></div>
  </div>

  <div id="bottom">
    <div id="topbottomright">
      Source d'entrée : unprocessed<br />
      Position GPS : inconnue
    </div>
    <div id="topbottomleft">Gain en amplitude : 0.0dB</div>

    <div style="text-align: center; margin-top: 20px">
      <button id="microphone" v-if="micoff" v-on:click="openmic">
        <font-awesome-icon icon="microphone" />
      </button>
      <button id="stopmicrophone" v-if="micon" @click="stopmic">
        <font-awesome-icon icon="stop" />
      </button>
    </div>

    <div id="bottomproperties" v-html="bottomproperties"></div>
  </div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/dist/plugin/wavesurfer.microphone";
import { useRecordsStore } from "@/stores/records";

const storeRecords = useRecordsStore();

export default {
  components: {},
  data() {
    return {
      count: 0,
      wavesurfer: null,
      wavesurfer2: null,
      wavesurferCurrent: null,
      spectrogram: null,
      microphone: {},
      context: {},
      processor: {},
      micon: false,
      micoff: true,
      recording: false,
      mediaRecorder: null,
      audioChunks: [],
      PtDialogIsOpen: true,
      bottomproperties: "-",
      storeRecords: storeRecords,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    openmic() {
      this.micon = true;
      this.micoff = false;
      this.recording = true;
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.processor = this.context.createScriptProcessor(1024, 1, 1);
      if (this.wavesurfer) {
        this.wavesurfer.destroy();
      }
      this.$nextTick(() => {
        this.wavesurfer = WaveSurfer.create({
          container: this.$refs.wave2,
          height: 360,
          barWidth: 3,
          cursorColor: "#000000",
          progressColor: "#333333",
          waveColor: "#111111",
          plugins: [Microphone.create()],
        });
        let ws = this.wavesurfer;
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
            const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
            const audioUrl = URL.createObjectURL(audioBlob);
						console.log("audioUrl", audioUrl);
            //const audio = new Audio(audioUrl);
            //audio.play();
            ws.load(audioUrl);
						storeRecords.addRecord("Sans titre...", new Date().toLocaleString(), audioBlob);
          });
        });
        this.wavesurfer.microphone.on("deviceError", function (code) {
          console.warn("Device error: " + code);
        });
        this.wavesurfer.microphone.start();
      });
    },
    select() {},
    startmic() {
      this.wavesurfer.microphone.start();
      this.recording = true;
    },
    stopdevicemic() {
      this.wavesurfer.microphone.stopDevice();
      this.recording = false;
      console.log(window.audioUrl);
    },
    playmic() {
      this.wavesurfer.microphone.play();
    },
    pausemic() {
      this.wavesurfer.microphone.pause();
    },
    stopmic() {
      this.wavesurfer.microphone.stop();
      this.micon = false;
      this.micoff = true;
      this.bottomproperties = new Date().toLocaleString();
      //this.wavesurfer.load(window.audioUrl);
    },
    toggleplaymic() {
      this.wavesurfer.microphone.togglePlay();
    }
  },
  mounted() {
    this.micon = false;
    this.micoff = true;
  },
};
</script>

<style scoped>
.audioRecordDiv {
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 12px;
}
.audioRecordLi {
  list-style-type: none;
  background-color: #d8d8d8;
  display: block;
  padding: 12px;
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

#top {
  height: 40vh;
  background-color: #009b60;
}
#bottom {
  padding: 6px;
  position: relative;
  height: calc(60vh - 180px);
}
#topbottomright {
  float: right;
}
#topbottomright,
#topbottomleft {
  font-size: 12px;
}
#microphone {
  height: 120px;
  width: 120px;
  border-radius: 120px;
  font-size: 40px;
  background-color: red;
  color: white;
  border: 1px solid darkred;
}
#stopmicrophone,
#show {
  height: 120px;
  width: 120px;
  border-radius: 120px;
  font-size: 40px;
  background-color: #222;
  color: white;
  border: 1px solid #111;
}
#bottomproperties {
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  text-align: center;
}
#wave2 {
  height: 100%;
  width: 100%;
}
</style>
