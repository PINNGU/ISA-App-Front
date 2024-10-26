<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Enter your email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
          placeholder="Choose a username"
        />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Enter your password"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirmPassword"
          required
          placeholder="Confirm your password"
        />
        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
      </div>

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          placeholder="Enter your name"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          v-model="form.address"
          required
          placeholder="Enter your address"
        />
        <span v-if="errors.address" class="error">{{ errors.address }}</span>
      </div>

      <button type="submit" class="btn-register">Register</button>
    </form>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
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
      form: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        address: '',
      },
      errors: {},
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.email) {
        this.errors.email = 'Email is required.';
      }

      if (!this.form.username) {
        this.errors.username = 'Username is required.';
      }

      if (!this.form.password) {
        this.errors.password = 'Password is required.';
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match.';
      }

      if (!this.form.name) {
        this.errors.name = 'Name is required.';
      }

      if (!this.form.address) {
        this.errors.address = 'Address is required.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async registerUser() {
      if (!this.validateForm()) return;

      try {
        const response = await axios.post('http://localhost:8080/api/users/register', this.form);
        this.successMessage = response.data;
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data;
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100%; /* Ensure the body takes up full height */
  margin: 0; /* Remove default margin */
}

.register-container {
  margin: auto; /* Center the form horizontally */
  margin-top: 10%; /* Center the form vertically */
  padding: 20px;
  background-color: #181818; /* Dark background to match navbar */
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff; /* White text */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%; /* Set the width to 100% of the viewport */
  max-width: 800px; /* Set a maximum width for larger screens */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
}

h2 {
  color: #ffa31a; /* Orange color for heading */
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%; /* Ensure form groups take full width */
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #fff; /* White text for labels */
}

.form-group input {
  width: 100%;
  padding: 12px; /* Increased padding for a more substantial feel */
  font-size: 16px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333; /* Dark input background */
  color: #fff; /* White text inside input */
}

.form-group input::placeholder {
  color: #aaa; /* Lighter gray for placeholders */
}

.form-group input:focus {
  border-color: #ffa31a; /* Orange border on focus */
  outline: none;
}

.error {
  color: #ff4c4c; /* Red color for error messages */
  font-size: 0.9em;
}

.success-message {
  color: #4caf50; /* Green color for success message */
  margin-top: 15px;
}

.error-message {
  color: #ff4c4c; /* Red color for error message */
  margin-top: 15px;
}

.btn-register {
  width: 100%;
  padding: 14px; /* Increased padding for a better look */
  font-size: 16px;
  background-color: #ffa31a; /* Orange background for button */
  color: #181818; /* Dark text for contrast */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #cc8400; /* Darker orange on hover */
}
</style>
