<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <button type="submit" class="login-button">Login</button>
        
        <!-- Additional section for registration suggestion -->
        <div class="register-prompt">
          <p>
            Don't have an account yet? 
            <router-link to="/register">Register here</router-link>
          </p>
        </div>
      </form>
  
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('/api/users/login', {
            email: this.email,
            password: this.password
          });
          
          // Handle successful login (e.g., store user info, navigate to another page)
          const userData = response.data;
          localStorage.setItem('user', JSON.stringify(userData)); // Save user data to local storage
          this.$router.push({ name: 'Posts' }); // Navigate to the posts page after login
        } catch (error) {
          // Handle login error
          this.errorMessage = error.response?.data?.message || 'Failed to log in. Please check your credentials.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  .register-prompt {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
  }
  
  .register-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  
  .error-message {
    margin-top: 15px;
    color: red;
    text-align: center;
  }
  </style>
  