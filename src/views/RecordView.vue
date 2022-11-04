<template>
  <div class="about">
    <button v-on:click="openmic">Record</button>
		<button :v-if="micon" @click="stopmic">Stop</button>
		<br/>
		<button :v-if="micon" @click="startmic">Start</button>
		<button :v-if="micon" @click="stopdevicemic">StopDevice</button>
		<button :v-if="micon" @click="playmic">Play</button>
		<button :v-if="micon" @click="pausemic">Pause</button>
		<button :v-if="micon" @click="toggleplaymic">togglePlay</button>
    <div id="waveform"></div>
    <div>ici...</div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/dist/plugin/wavesurfer.microphone";

export default {
  components: {
    WaveSurfer,
    Microphone,
  },
  data() {
    return {
      count: 0,
      wavesurfer: null,
      microphone: {},
      context: {},
      processor: {},
			micon: false,
			mediaRecorder: null,
			audioChunks: []
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    openmic() {
			this.micon = true;
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.processor = this.context.createScriptProcessor(1024, 1, 1);
			if(!this.wavesurfer) {
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
					mediaRecorder.addEventListener('dataavailable', event=>{
							audioChunks.push(event.data);              
					})
            mediaRecorder.addEventListener("stop", () => {
								console.log("stop");
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            });
						
        });
        this.wavesurfer.microphone.on("deviceError", function (code) {
          console.warn("Device error: " + code);
        });
        this.wavesurfer.microphone.start();
      });
}
      
      /*

    wavesurfer.microphone.on("deviceReady", function (stream) {
      console.log("Device ready!", stream);
    });
    wavesurfer.microphone.on("deviceError", function (code) {
      console.warn("Device error: " + code);
    });*/
    },
		/*
				<button :v-if="micon" @click="startmic">Start</button>
		<button :v-if="micon" @click="stopdevicemic">StopDevice</button>
		<button :v-if="micon" @click="playmic">Play</button>
		<button :v-if="micon" @click="pausemic">Pause</button>
		<button :v-if="micon" @click="stopmic">Stop</button>
		<button :v-if="micon" @click="toggleplaymic">togglePlay</button>
		*/
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
		}
  },
  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`);
  },
};
</script>
