<!-- TaskView.vue -->
<template>
  <div class="task-view-container">
    <h2>My Tasks</h2>
    
    <!-- Search Form -->
    <div class="search-container">
      <input v-model="searchQuery" @input="searchTasks" placeholder="Search tasks by title or status"  type="search" />
    </div>

    <!-- Task Creation Form -->
      <form @submit.prevent="createTask"  class="task-form">
      <input v-model="title" placeholder="Title" required />
      <input v-model="description" placeholder="Description" required />
      <input v-model="due_date" type="date" required />
     <select v-model="status" required>
  <option disabled value="">Select status</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

       <textarea v-model="remarks" placeholder="Remarks"></textarea>
      <button type="submit">Add Task</button>
    </form>

  

    <!-- Task Table -->
<table class="task-table">
  <thead>
    <tr>
      <th @click="sortBy('title')">Title <component
    :is="sortKey === 'title' ? (sortAsc ? ChevronUpIcon : ChevronDownIcon) : null"
     class="sort-icon"
  /></th>
      <th @click="sortBy('description')"> Description
        <component
    :is="sortKey === 'description' ? (sortAsc ? ChevronUpIcon : ChevronDownIcon) : null"
     class="sort-icon"
  /></th>
      <th @click="sortBy('due_date')">Due Date  <component
    :is="sortKey === 'due_date' ? (sortAsc ? ChevronUpIcon : ChevronDownIcon) : null"
     class="sort-icon"
  /></th>
      <th @click="sortBy('status')">Status  <component
    :is="sortKey === 'status' ? (sortAsc ? ChevronUpIcon : ChevronDownIcon) : null"
     class="sort-icon"
  /></th>
      <th>Remarks</th>
      <th @click="sortBy('created_on')">Created On
       <component
    :is="sortKey === 'created_on' ? (sortAsc ? ChevronUpIcon : ChevronDownIcon) : null"
    class="sort-icon"
  /></th>
      <th>Created By</th>
      <th>Updated On</th>
      <th>Updated By</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in sortedTasks" :key="task.id">
      <td><strong>{{ task.title }}</strong></td>
      <td>{{ task.description }}</td>
      <td>{{ task.due_date }}</td>
      <td>{{ task.status }}</td>
      <td>{{ task.remarks }}</td>
      <td>{{ task.created_on }}</td>
      <td>{{ task.created_by_name }} (ID: {{ task.created_by_id }})</td>
      <td>{{ task.updated_on }}</td>
      <td>{{ task.updated_by_name }} (ID: {{ task.updated_by_id }})</td>
      <td>
        <button @click="editTask(task)">Edit</button>
        <button @click="taskToDelete = task">Delete</button>
      </td>
    </tr>
  </tbody>
</table>



   <!-- Edit Task Form -->
    <div v-if="editingTask"  class="modal-overlay edit-task-form">
     <div class="modal">
      <h3>Edit Task</h3>
      <form @submit.prevent="updateTask">
        <input v-model="editingTask.title" placeholder="Title" required />
        <input v-model="editingTask.description" placeholder="Description" required />
        <input v-model="editingTask.due_date" type="date" required />
      <select v-model="editingTask.status" required>
  <option disabled value="">Select status</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>


         <textarea v-model="editingTask.remarks" placeholder="Remarks"></textarea>
         <div class="modal-actions">
            <button type="submit">Update</button>
            <button @click="cancelEdit" type="button">Cancel</button>
          </div>
      </form>
    </div>
  </div>
   <!-- Delete Confirmation Modal -->
    <div v-if="taskToDelete" class="modal-overlay">
      <div class="modal confirm">
        <p>Are you sure you want to delete this task?</p>
        <div class="modal-actions">
          <button @click="deleteTask(taskToDelete.id)">Yes, Delete</button>
          <button @click="taskToDelete = null">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'


export default {
  data() {
    return {
      title: '',
      description: '',
      due_date: '',
      status: '',
      tasks: [],
       searchQuery: '',
      editingTask: null, 
      taskToDelete: null,

       // Add these 👇
    sortKey: '',
    sortAsc: true,
     selectedTasks: [],
    }
  },
  async mounted() {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      const token = localStorage.getItem('token')
      console.log(localStorage.getItem('token'))

      if (!token) {
    console.error("Token not found in localStorage")
    return; // exit if token is not found
  }
      console.log("token ",token)
       try {
    const res = await axios.get('tasks/', {
      headers: { Authorization: `Token ${token}` },
      params: { title: this.searchQuery, status: this.searchQuery }
    })
    this.tasks = res.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
    },
    async createTask() {
      const token = localStorage.getItem('token')
      console.log(token)
      await axios.post('tasks/', {
        title: this.title,
        description: this.description,
        due_date: this.due_date,
        status: this.status,
         remarks: this.remarks 
      }, {
        headers: { Authorization: `Token ${token}` }
      })
      this.title = this.description = this.due_date = this.status = ''
      await this.fetchTasks()
    },
    async deleteTask(id) {
      const token = localStorage.getItem('token')
      await axios.delete(`tasks/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      await this.fetchTasks()
    },
     // Start editing a task
    editTask(task) {
      this.editingTask = { ...task }  // Make a copy of the task for editing
    },

    // Update the task after editing
    async updateTask() {
      const token = localStorage.getItem('token')
      await axios.put(`/tasks/${this.editingTask.id}/`, {
        title: this.editingTask.title,
        description: this.editingTask.description,
        due_date: this.editingTask.due_date,
        status: this.editingTask.status,
         remarks: this.editingTask.remarks 
      }, {
        headers: { Authorization: `Token ${token}` }
      })
      this.editingTask = null  // Clear the edit form
      await this.fetchTasks()  // Re-fetch tasks after updating
    },

    // Cancel editing task
    cancelEdit() {
      this.editingTask = null
    },

    // Handle search input and fetch tasks
    searchTasks() {
      this.fetchTasks()  // Re-fetch tasks based on search query
    },
    sortBy(key) {
  if (this.sortKey === key) {
    this.sortAsc = !this.sortAsc
  } else {
    this.sortKey = key
    this.sortAsc = true
  }
},
  toggleTaskSelection(id) {
    const idx = this.selectedTasks.indexOf(id)
    if (idx === -1) {
      this.selectedTasks.push(id)
    } else {
      this.selectedTasks.splice(idx, 1)
    }
  },
  isSelected(id) {
    return this.selectedTasks.includes(id)
  }



  },
  computed: {
  sortedTasks() {
    const tasks = [...this.tasks]
    if (this.sortKey) {
      tasks.sort((a, b) => {
        let aVal = a[this.sortKey]
        let bVal = b[this.sortKey]
        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()

        if (aVal < bVal) return this.sortAsc ? -1 : 1
        if (aVal > bVal) return this.sortAsc ? 1 : -1
        return 0
      })
    }
    return tasks
  }
},

}
</script>

<style scoped>
/* General Styles for the Task View */
.task-view-container {
  padding: 20px;
 background: #f4f6f8;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Search Form */
.search-container {
  margin-bottom: 20px;
}

input[type="search"] {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f8f9fa;
}

input[type="search"]:focus {
  outline: none;
  border-color: #007bff;
}

/* Task Creation Form */
.task-form,
.edit-task-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.task-form input,.task-form select,
.task-form textarea ,
.modal input,.modal select,
.modal textarea{
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.task-form input[type="date"] {
  padding: 8px;
}

.task-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-form button:hover {
  background-color:rgb(17, 105, 95);
}

.task-form textarea {
  resize: vertical;
  min-height: 100px;
}

.task-form button,
.modal-actions button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-form button {
  background-color: #00796b;
  color: white;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  background: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.task-item button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 12px;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.task-item button:first-of-type {
  background-color: #dc3545;
}

.task-item button:last-of-type {
  background-color: #28a745;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal.confirm p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button:first-child {
  background-color: #dc3545;
  color: white;
}

.modal-actions button:last-child {
  background-color: #6c757d;
  color: white;
}

.modal-actions button:hover {
  opacity: 0.9;
}

/* Task List Styles */
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.task-table th,
.task-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.task-table th {
  background-color:#00796b;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
}

.task-table th:hover {
  background-color:rgb(8, 99, 88);
}

.task-table td {
  color: #333;
}

.task-table tr:hover {
  background-color: #f1f1f1;
}


button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c82333;
}

/* Edit Task Form */
.edit-task-form {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.edit-task-form input,.edit-task-form select,
.edit-task-form textarea {
  margin: 10px 0;
}

.edit-task-form button {
  background-color: #28a745;
  color: white;
}

.edit-task-form button:hover {
  background-color: #218838;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .task-view-container {
    padding: 10px;
  }

  .task-form,
  .edit-task-form {
    padding: 15px;
  }

  .task-item {
    padding: 12px;
  }
}
.sort-icon {
  width: 16px;
  height: 16px;
  color: #6b7280; /* Same as Tailwind's text-gray-500 */
  vertical-align: middle;
}

</style>