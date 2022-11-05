<script>
export default {
  props: ["title", "date", "audioB64", "audioUrl"],
};
</script>

<template>
  <div class="audioRecord">
    <span class="title">{{ title }}</span>
    <button class="removeButton" @click="$emit('remove')">x</button>
    <span class="date">{{ date }}</span>
    <br />
    <audio
      controls
      v-if="audioUrl"
      type="audio/mpeg"
      v-bind:b64="audioB64"
    	v-bind:src="audioUrl" >
		</audio>
  </div>
</template>

<style scoped>
.audioRecord {
  list-style-type: none;
  display: block;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 10px;
}
.audioRecord .title {
  font-weight: bold;
  color: green;
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
  width: 24px;
  height: 24px;
  background: black;
  color: white;
  float: right;
  margin-left: 12px;
}
</style>
