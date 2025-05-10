

<template>
 
   <div class="app-container">
    <Navbar />

    <div class="main-content">
    
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
/* Layout styles */
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f9f9f9; /* light gray background */
  flex-direction: column;
}

@media (min-width: 768px) {
  .app-container {
    flex-direction: row;
  }

  .main-content {
    margin-left: 250px; /* width of sidebar */
  }
}

.main-content {
  padding: 1.5rem;
  flex: 1;
}
</style>

