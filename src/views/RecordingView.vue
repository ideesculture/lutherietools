<script>
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram";

import base64js from "base64-js";

export default {
  props: ["id", "title", "date", "audioB64", "audioUrl"],
  methods: {
    saveTitle(e) {
      // get the title
      let title = e.srcElement.textContent;
			console.log("saveTitle", title);
      this.$emit('savetitle', this.id, title);
    },
  },
	mounted() {
		let id = this.id;
		console.log("#wave-spectrogram" + id);
		/*let wavesurfer = WaveSurfer.create({
			plugins: [
					Spectrogram.create({
							container: "#wave-spectrogram" + id,
							labels: true,
							height: 256,
					})
			]
		});*/
		//console.log(wavesurfer);
		//wavesurfer.loadArrayBuffer(this.audioB64);
  }
};
</script>

<template>
  <div class="audioRecord">
		<span class="recordId">{{ id }}</span>
    <span
      contenteditable="true"
      @blur="saveTitle($event)"
      class="title green"
      >{{ title }}</span
    >

    <button class="removeButton" @click="$emit('remove')">
      <font-awesome-icon icon="xmark" />
    </button>
    <span class="date">{{ date }}</span>
    <br />
    <audio
      controls
      v-if="audioUrl"
      type="audio/mpeg"
      v-bind:b64="audioB64"
      v-bind:src="audioUrl"
    ></audio>
  </div>
</template>

<style scoped>
.recordId {
	color:white;
	font-size:0.6em;
}
.wave-spectrogram {
	height:120px;
	background-color:black;
}
.audioRecord {
  list-style-type: none;
  display: block;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 10px;
}
.audioRecord .title {
  font-weight: bold;
  font-size: 20px;
}
.audioRecord .date {
  float: right;
}
.audioRecord audio {
  width: 100%;
}

button.removeButton {
  border-radius: 12px;
  border: none;
  width: 24px;
  height: 24px;
  background: black;
  color: white;
  float: right;
  margin-left: 12px;
  padding: 0;
}
button.removeButton:active {
  color: white;
  box-shadow: 0 5px #999999;
  transform: translateY(4px);
}
</style>
