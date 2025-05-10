<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
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
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
  async register() {
  try {
    console.log('Sending registration data...');
    const res = await axios.post('register/', {
      username: this.username,
      email: this.email,
      password: this.password
    })
    console.log('Response:', res);
    localStorage.setItem('token', res.data.token)
    this.$router.push('/tasks')
  } catch (error) {
    console.error('Error during registration:', error);
    this.error = 'Registration failed';
  }
}
  }
}
</script>
