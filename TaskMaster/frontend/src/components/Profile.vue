<template>
  <div class="profile-page">
    <h2>👤 Profile</h2>
    <label>Name: <input v-model="profile.name" /></label>
    <label>Email: <input v-model="profile.email" /></label>
    <label>Bio: <textarea v-model="profile.bio" /></label>
    <button @click="saveProfile">Save</button>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      profile: {
        name: "John Doe",
        email: "john@example.com",
        bio: "Productivity enthusiast"
      }
    };
  },
  methods: {
    saveProfile() {
      alert("Profile saved locally!");
    }
  }
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
}
label {
  display: block;
  margin-bottom: 10px;
}
textarea {
  width: 100%;
  height: 80px;
}
</style>
