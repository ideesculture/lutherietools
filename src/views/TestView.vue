<template>
  <div class="container">
    <div>Ici</div>
    <div id="waveform" ref="waveform"></div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";

export default {
  name: "TestView",
  data: () => ({
    wavesurfer: null,
  }),
  async mounted() {
    if (!this.wavesurfer) this.createWaveSurfer();
  },
  methods: {
    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barWidth: 3,
      });
      this.wavesurfer.load(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
    },
  },
};
</script>
