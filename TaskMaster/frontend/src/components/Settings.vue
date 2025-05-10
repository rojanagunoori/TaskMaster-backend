<template>
  <div class="settings-page">
    <h2>⚙️ Settings</h2>
    <div>
      <label>Theme:
        <select v-model="theme">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </label>
    </div>
    <div>
      <label>AI Model:
        <select v-model="aiModel">
          <option>gpt4all</option>
          <option>llama.cpp</option>
        </select>
      </label>
    </div>
    <button @click="saveSettings">Save</button>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      theme: "Light",
      aiModel: "gpt4all"
    };
  },
  methods: {
    saveSettings() {
      alert(`Settings saved! Theme: ${this.theme}, Model: ${this.aiModel}`);
    }
  }
};
</script>

<style scoped>
.settings-page {
  padding: 20px;
}
label {
  display: block;
  margin-bottom: 10px;
}
</style>
