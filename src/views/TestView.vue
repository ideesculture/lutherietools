<template>
  <div class="container">
    <div>Ici</div>
    <div id="waveform" ref="waveform"></div>
    <button id="record" ref="record" @click="record">record</button>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/dist/plugin/wavesurfer.microphone";

export default {
  name: "TestView",
  data: () => ({
    wavesurfer: null,
    microphone: null,
  }),
  async mounted() {},
  methods: {
    record() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barWidth: 3,
        plugins: [Microphone.create()],
      });
      this.wavesurfer.microphone.on("deviceReady", function () {
        console.info("Device ready!");
      });
      this.wavesurfer.microphone.on("deviceError", function (code) {
        console.warn("Device error: " + code);
      });
      this.wavesurfer.microphone.start();
    },
    stopMic() {
      // start/stop mic on button click
      if (this.wavesurfer.microphone.active) {
        this.wavesurfer.microphone.stop();
      } else {
        this.wavesurfer.microphone.start();
      }
    },
  },
};
</script>
