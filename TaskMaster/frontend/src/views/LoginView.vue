<!-- LoginView.vue -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('login/', {
          username: this.username,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/tasks')
      } catch {
        this.error = 'Invalid credentials'
      }
    }
  }
}
</script>

