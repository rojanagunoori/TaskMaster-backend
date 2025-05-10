<template>
  <div class="notes-summaries">
    <h2>📝 Notes & Summaries</h2>
    <textarea v-model="note" placeholder="Write meeting notes here..."></textarea>
    <button @click="summarizeNote">Summarize</button>
    <div v-if="summary" class="summary-box">
      <strong>Summary:</strong>
      <p>{{ summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotesSummaries",
  data() {
    return {
      note: "",
      summary: ""
    };
  },
  methods: {
    summarizeNote() {
      // Simple static fake summary
      this.summary = "This is a summary of your notes. Key points extracted and simplified.";
    }
  }
};
</script>

<style scoped>
.notes-summaries {
  padding: 20px;
}
textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 10px;
}
.summary-box {
  background: #f3f3f3;
  padding: 10px;
  border-left: 4px solid #00796b;
}
</style>
