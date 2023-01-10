<script>
import LutherieToolsWelcome from "../components/LutherieToolsWelcome.vue";
import { useRecordsStore } from "@/stores/records";

const storeRecords = useRecordsStore();

export default {
  components: {LutherieToolsWelcome},
  data() {
    return {}
	},
	mounted() {
		fetch("/violon.wav")
		.then(res => {
			var reader = res.body.getReader();
			return reader.read().then(result => {
				return result;
			});
		})
		.then(data => {
			console.log(data);
			var audioBlob = new Blob([data.value], { type: "audio/wav" });
			if(storeRecords.size() == 0) {
				storeRecords.addRecord("Violon", "donnée de référence", audioBlob);
			}
		});
		
	}
}
</script>

<template>
	<div class="container">
	<LutherieToolsWelcome />
	</div>
</template>
