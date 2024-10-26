<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <h1><span class="logo-part1">Only</span><span class="logo-part2">buns</span></h1>
    </div>
    <ul class="navbar-links">
      <li><router-link to="/" exact-active-class="active-link">Home</router-link></li>
      <li><router-link to="/posts" exact-active-class="active-link">Posts</router-link></li>
      <li><router-link to="/trends" exact-active-class="active-link">Trends</router-link></li>
      <li><router-link to="/nearby" exact-active-class="active-link">Near You</router-link></li>
      <li><router-link to="/chat" exact-active-class="active-link">Chat</router-link></li>
      <li><router-link to="/profile" exact-active-class="active-link">My Profile</router-link></li>
      
      <!-- Conditional Links based on authentication state -->
      <li v-if="!isLoggedIn">
        <router-link to="/login" exact-active-class="active-link">Login</router-link>
      </li>
      <li v-if="isLoggedIn">
        <a href="#" @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(localStorage.getItem('user') !== null);

    // Logout method
    const logout = () => {
      localStorage.removeItem('user'); // Remove user data from local storage
      isLoggedIn.value = false;
      router.push({ name: 'Home' }); // Redirect to Home after logout
    };

    return {
      isLoggedIn,
      logout
    };
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.navbar-logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.logo-part1 {
  color: #ffffff; /* White text for "Only" */
}

.logo-part2 {
  color: #181818; /* Black text for "buns" */
  background-color: #ffa31a; /* Orange background */
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 4px;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
}

.navbar-links li {
  list-style: none;
}

.navbar-links li a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.2s;
  padding: 5px 10px;
  border-radius: 4px;
}

.navbar-links li a:hover,
.navbar-links li a.active-link {
  color: #ffa31a;
  background-color: rgba(255, 163, 26, 0.1);
}
</style>
