<script setup>

</script>

<template>
  <div id="top"></div>
  <div id="bottom">
    <div id="topbottomright">
      Source d'entrée : unprocessed<br />
      Position GPS : inconnue
    </div>
    <div id="topbottomleft">Gain en amplitude : 0.0dB</div>

    <div style="text-align: center; margin-top: 20px">
      <button id="microphone">
        <font-awesome-icon icon="microphone" />
      </button>
    </div>

    <div id="bottomproperties">2022-10-03 14:50:20</div>
  </div>
</template>

<style scoped>
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
	font-size:12px;
}
#microphone {
  height: 120px;
  width: 120px;
  border-radius: 120px;
  font-size: 40px;
	background-color:red;
	color:white;
	border:1px solid darkred;
}
#bottomproperties {
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  text-align: center;
}
</style>
