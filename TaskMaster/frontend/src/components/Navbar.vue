<template>
  <div class="app-container">
    <!-- Top Navbar -->
    <header class="top-navbar">
      <h1>TaskMaster</h1>
      <div class="top-navbar-actions">
        <button @click="logout">Logout</button>
      </div>
    </header>

    <!-- Sidebar for Desktop -->
    <aside class="sidebar desktop">
      <nav>
        <ul>
          <li v-for="item in navItems" :key="item.label" @click="navigate(item.path)">
            <span>{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Bottom Nav for Mobile -->
    <footer class="bottom-nav mobile">
      <ul>
        <li v-for="item in mobileItems" :key="item.icon" @click="navigate(item.path)">
          <span>{{ item.icon }}</span>
        </li>
      </ul>
    </footer>

    <!-- Main Content -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      navItems: [
        { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
        { icon: '🗂️', label: 'My Tasks', path: '/tasks' },
        { icon: '📁', label: 'Projects', path: '/projects' },
        { icon: '📅', label: 'Calendar', path: '/calendar' },
        { icon: '🤖', label: 'AI Assistant', path: '/ai' },
        { icon: '📊', label: 'Reports', path: '/reports' },
        { icon: '📝', label: 'Notes', path: '/notes' },
        { icon: '⚙️', label: 'Settings', path: '/settings' }
      ],
      mobileItems: [
        { icon: '🏠', path: '/dashboard' },
        { icon: '🗂️', path: '/tasks' },
        { icon: '📅', path: '/calendar' },
        { icon: '🤖', path: '/ai' },
        { icon: '⚙️', path: '/settings' }
      ]
    }
  },
  methods: {
    navigate(path) {
      this.$router.push(path)
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* General Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  position: relative;
}

/* Top Navbar */
.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00796b;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 35px; /* Adjust this height */
}

.top-navbar h1 {
  font-size: 1.5rem;
}

.top-navbar-actions button {
  background-color: #00796b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
}

.top-navbar-actions button:hover {
  background-color: #004d40;
}

/* Sidebar for Desktop */
.sidebar {
  width: 180px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  height: 100vh;
  position: fixed;
  top: 35px; /* Sidebar starts below the top navbar */
  left: 0;
  padding: 1rem;
  z-index: 999;
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 1rem;
  cursor: pointer;
  display: flex;
  gap: 10px;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #e0f7f7;
}

.desktop {
  display: none;
}

@media (min-width: 768px) {
  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }

  .app-container {
    flex-direction: row;
  }

  /* Adjust main content */
  .main-content {
    margin-top: 35px; /* Space for the top navbar */
    margin-left: 180px; /* Space for the sidebar */
    padding: 1.5rem;
    flex: 1;
    transition: margin-left 0.3s ease-in-out;
  }
}

/* Mobile Adjustments */
.mobile {
  display: block;
}

@media (max-width: 767px) {
  /* Ensure top navbar doesn’t hide main content */
  .main-content {
    margin-top: 35px; /* Add space for the top navbar */
    padding: 1.5rem;
    flex: 1;
  }

  .top-navbar {
    height: 35px; /* Decrease navbar height on mobile */
    padding: 0.8rem; /* Adjust padding */
  }

  .bottom-nav {
    padding: 0.5rem;
    font-size: 1rem; /* Reduce font size */
    height: 50px; /* Reduce height of bottom navbar */
  }

  .bottom-nav ul {
    justify-content: space-evenly; /* Evenly space items */
  }

  .bottom-nav li {
    font-size: 1.2rem; /* Reduce font size of items */
  }
}

/* Bottom Nav for Mobile */
.bottom-nav {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center; /* Vertically center the items */
  z-index: 999;
  padding: 0.2rem 0; /* Reduce padding on the top and bottom */
}

.bottom-nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0;
}

.bottom-nav li {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.3rem 0; /* Reduce vertical padding */
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-nav li:hover {
  background-color: #e0f7f7;
  border-radius: 10px;
}
/* Mobile Styling */
.mobile {
  display: block;
}

@media (min-width: 768px) {
  .mobile {
    display: none;
  }
}

</style>
