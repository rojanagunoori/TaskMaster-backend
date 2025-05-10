<template>
  <div class="quick-add">
    <input
      v-model="quickTaskInput"
      @input="parseQuickTask"
      placeholder="Quick Add (e.g., 'Call Sarah tomorrow at 3pm')"
    />
    
    <div v-if="parsedQuickTask" class="quick-suggestions">
      <p><strong>Title:</strong> {{ parsedQuickTask.title }}</p>
      <p><strong>Due:</strong> {{ parsedQuickTask.due_date }}</p>
      <button @click="addParsedQuickTask">Add Task</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuickAddTask',
  data() {
    return {
      quickTaskInput: '',
      parsedQuickTask: null
    }
  },
  methods: {
    parseQuickTask() {
      const input = this.quickTaskInput.toLowerCase();
      let title = input;
      let due_date = '';

      if (input.includes('tomorrow')) {
        due_date = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
        title = input.replace('tomorrow', '').trim();
      }

      this.parsedQuickTask = {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        due_date
      };
    },
    async addParsedQuickTask() {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/tasks/', {
        title: this.parsedQuickTask.title,
        due_date: this.parsedQuickTask.due_date,
        status: 'To Do',
        description: '',
        remarks: ''
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      this.quickTaskInput = '';
      this.parsedQuickTask = null;

      this.$emit('task-added'); // optional: notify parent
    }
  }
}
</script>

<style scoped>
.quick-add {
  margin-bottom: 20px;
}
.quick-add input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
}
.quick-suggestions {
  background: #e3f2fd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
}
</style>
