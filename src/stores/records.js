import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useRecordsStore = defineStore({
  id: "records",
  state: () => ({
    records: useStorage("records", []),
    activeRecord: useStorage("activeRecord", {}),
  }),
  actions: {
    addRecord(title, date, audioBlob) {
      this.activeRecord.title = title;
      let timestring =
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      this.activeRecord.date = timestring;
      this.activeRecord.audioBlob = audioBlob;
      var reader = new window.FileReader();
      let that = this;
      let base64 = "";
      reader.readAsDataURL(audioBlob);
      reader.onloadend = function () {
        base64 = reader.result;
        base64 = base64.split(",")[1];
        base64 = "data:audio/wav;base64," + base64;
        that.records.push({
					id: that.records.length,
          title: title,
          date: timestring,
          audioB64: base64,
        });
      };
    },
    removeRecordByIndex(index) {
      this.records.splice(index, 1);
    },
    saveRecordTitle(index, title) {
      this.records[index].title = title;
    },
  },
});
