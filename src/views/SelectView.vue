<template>
  <div class="about">
    <div id="waveform"></div>
    <div
      class="audioRecordDiv"
      v-for="(record, index) in storeRecords.records"
      v-bind:key="index"
    >
      <RecordingView
        :key="record.id"
        :id="record.id"
        :title="record.title"
        :date="record.date"
        :audioUrl="record.audioB64"
        :audioB64="record.audioB64"
        @remove="removeRecord(index)"
        @savetitle="saveTitle"
      />
      <button
        @click="togglePtDialog(index)"
        v-if="!record.PtDialogIsOpen"
        :disabled="buttonsDisabled"
      >
        Post-traitement
      </button>
      <div v-if="record.PtDialogIsOpen">
        <div style="display: none">
          <label>filename</label>
          <input
            name="filepath"
            class="input"
            v-model="filename"
            type="text"
          /><br />
        </div>
        <label>horizon</label>
        <input
          name="horizon"
          class="input"
          v-model="horizon"
          type="text"
        /><br />
        <label>overlap</label>
        <input
          name="overlap"
          class="input"
          v-model="overlap"
          type="text"
        /><br />
        <label>nbPoles</label>
        <input
          name="nbPoles"
          class="input"
          v-model="nbPoles"
          type="text"
        /><br />
        <label>exportFolder</label>
        <input name="exportFolder" class="input" v-model="exportFolder" type="text" /><br />
		<img v-if="showSpectrogram == true" :src="spectrogramUrl" @error="spectrogramLoadError" />
        <button @click="cancelPtDialog(index)" :disabled="buttonsDisabled">
          Annuler
        </button>
        <button @click="posttreat(index)" :disabled="buttonsDisabled">
          Envoyer
        </button>

        <button :disabled="resultsDisabled">
          <RouterLink class="nav-link" :to="{ name: 'graph' }">
            <font-awesome-icon
              icon="spinner"
              class="fa-spin"
              v-if="buttonsDisabled && resultsDisabled"
            />
            Voir les résultats
          </RouterLink>
        </button>
        <!--
        <form action="https://lutherietools.ideesculture.fr/api/" method="post">
				</form> -->
      </div>
      <div id="voir-post-traitement"></div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/dist/plugin/wavesurfer.microphone";
//import Spectrogram from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram";
import { useRecordsStore } from "@/stores/records";
import RecordingView from "./RecordingView.vue";

const storeRecords = useRecordsStore();

export default {
  components: {
    RecordingView,
  },
  data() {
    return {
      count: 0,
      wavesurfer: null,
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
      storeRecords: storeRecords,
      PtDialogIsOpen: true,
      buttonsDisabled: false,
      filepath: "",
      horizon: 0.04,
      overlap: 0.15,
      nbPoles: 100,
      exportFolder: "exports",
      filename: "test",
      resultsDisabled: true,
      urlJson: "",
	spectrogramUrl: "",
		showSpectrogram: false
    };
  },
  computed: {},
  async mounted() {
		this.micon = false;
    this.micoff = true;

		for (let i = 0; i < storeRecords.records.length; i++) {
			console.log(i);
			storeRecords.records[i].PtDialogIsOpen = false;
		}
    //this.record.title = storeRecords.records[index].title;
    if (storeRecords.records[0].title) {
      let cleanedName =
        storeRecords.records[0].title + "_" + storeRecords.records[0].date;
      cleanedName = cleanedName.latinize();
      cleanedName = cleanedName.replace(/([\.\/:\s_éèêàçùöôûâîï])/gi, "_");
      this.exportFolder = cleanedName;
    }
  },
  methods: {
    removeRecord(index) {
      console.log("remove", index);
      storeRecords.removeRecordByIndex(index);
    },
    saveTitle(id, title) {
      console.log("RecordView saveTitle", id + " " + title);
      storeRecords.records[id].title = title;
    },
    increment() {
      this.count++;
    },
    togglePtDialog(index) {
      console.log("openPtDialog");
      for (let i = 0; i < storeRecords.records.length; i++) {
        console.log(i);
        storeRecords.records[i].PtDialogIsOpen = false;
      }
      storeRecords.records[index].PtDialogIsOpen =
        !storeRecords.records[index].PtDialogIsOpen;
      console.log(storeRecords.records[index]);
      //this.record.title = storeRecords.records[index].title;
      let cleanedName =
        storeRecords.records[index].title +
        "_" +
        storeRecords.records[index].date;
      cleanedName = cleanedName.latinize();
      cleanedName = cleanedName.replace(/([\.\/:\s_éèêàçùöôûâîï])/gi, "_");
      this.exportFolder = cleanedName;

      this.spectrogramUrl = "https://lutherietools.ideesculture.fr/api/python/exports/export_"+cleanedName+"/spectrogram.png";
	  this.showSpectrogram = true;
	},
	spectrogramLoadError () {
		this.showSpectrogram = false;
      console.log('Image failed to load');
    },
    cancelPtDialog(index) {
      console.log("cancelPtDialog");
      storeRecords.records[index].PtDialogIsOpen =
        !storeRecords.records[index].PtDialogIsOpen;
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
          container: "#waveform",
          waveColor: "black",
          interact: false,
          cursorWidth: 0,
          audioContext: this.context || null,
          audioScriptProcessor: this.processor || null,
          plugins: [Microphone.create()],
        });

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
    },
    select() {},
    startmic() {
      document.getElementById("waveform").style.display = "block";
      this.wavesurfer.microphone.start();
      this.recording = true;
    },
    stopdevicemic() {
      this.wavesurfer.microphone.stopDevice();
      this.recording = false;
    },
    playmic() {
      this.wavesurfer.microphone.play();
    },
    pausemic() {
      this.wavesurfer.microphone.pause();
    },
    stopmic() {
      document.getElementById("waveform").style.display = "none";
      this.wavesurfer.microphone.stop();
    },
    toggleplaymic() {
      this.wavesurfer.microphone.togglePlay();
    },
    posttreat(index) {
      console.log(this.overlap);
      console.log("posttreat");
      console.log(index);
      this.$parent.$parent.$data.currentrecord = storeRecords.records[index];
      let currentrecord = storeRecords.records[index];
      // with hash, resulting in /about#team
      this.buttonsDisabled = true;
      //this.$router.push('/graph');

      // POST request using fetch with set headers
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: this.filename,
          audio: currentrecord.audioB64,
          horizon: parseFloat(this.horizon),
          overlap: parseFloat(this.overlap),
          nbPoles: parseFloat(this.nbPoles),
          samplerate: parseFloat(this.samplerate),
          exportfolder: this.exportFolder,
        }),
      };
      let that = this;
      fetch(
        "https://lutherietools.ideesculture.fr/api/index.php",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(".url", data.url);
          that.resultsDisabled = false;
          that.$parent.$parent.url = data.url;
          console.log("this.$parent.$parent.url", that.$parent.$parent.url);
        });
    },
    viewgraph() {
      console.log("this.$parent.$parent.url", this.$parent.$parent.url);
    },
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
button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
  color: gray;
  border-color: gray;
}
button:disabled:active {
  transform: none;
  background-color: gray;
}
button:disabled:hover {
  background-color: gray;
  border: gray;
  color: white;
}
label {
	display: inline-block;
	width:120px;
	border-bottom:1px solid rgba(0,0,0,0.1);
	margin-right:10px;
}
input.input {
	border:1px solid rgba(0,0,0,0.1);
	width:calc(100% - 130px);
	margin-bottom:4px;
}
</style>
<style>
img.spectrogramImage {
	width:100%;
	height:auto;
}
</style>
