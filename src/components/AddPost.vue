<template>
    <div class="container">
      <h1 class="title">Add Post</h1>
      <form @submit.prevent="submitPost" class="post-form">
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="post.description" id="description" required class="form-control"></textarea>
        </div>
  
        <div class="form-group location-group">
          <h3>Location</h3>
          <label for="address">Address:</label>
          <input v-model="post.location.address" id="address" required class="form-control" />
  
          <div class="location-inputs">
            <div>
              <label for="latitude">Latitude:</label>
              <input type="number" v-model="post.location.latitude" id="latitude" step="any" required class="form-control" />
            </div>
            <div>
              <label for="longitude">Longitude:</label>
              <input type="number" v-model="post.location.longitude" id="longitude" step="any" required class="form-control" />
            </div>
          </div>
        </div>
  
        <div class="form-group">
          <h3>Image</h3>
          <label for="imageData">Upload Image:</label>
          <input type="file" @change="handleImageUpload" id="imageData" required class="form-control" />
        </div>
  
        <button type="submit" class="btn-submit">Submit Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        post: {
          description: '',
          location: {
            address: '',
            latitude: '',
            longitude: '',
          },
          image: {
            name: '', 
            data: '', 
          },
          creationTime: new Date().toISOString().slice(0, 10), 
          likes: 0,
        },
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = (e) => {
          
          this.post.image.data = e.target.result.split(',')[1];
        };
  
        if (file) {
          this.post.image.name = file.name;
          reader.readAsDataURL(file);
        } else {
          this.post.image.data = ''; 
        }
      },
      async submitPost() {
        try {
         
          if (!this.post.image || !this.post.image.data) {
            throw new Error("Image data is required.");
          }
  
          const response = await axios.post('http://localhost:8080/api/posts/create', this.post, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Post created successfully:', response.data);
        } catch (error) {
          console.error('Error creating post:', error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  .container {
    max-width: 100%;
    min-width: 1000px;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #000; 
    color: #fff; 
    position: relative;
    top: 35%;
    left: 8%;
    transform: translateY(-50%);
  }
  
  .title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem; 
    color: #ffcc00; 
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-control {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #ffcc00; 
    border-radius: 4px;
    font-size: 1rem;
    background-color: #333; 
    color: #fff;
    transition: border-color 0.3s;
  }
  
  .form-control:focus {
    border-color: #ffcc00; 
    outline: none;
  }
  
  .location-group {
    margin-top: 1rem;
  }
  
  .location-inputs {
    display: flex;
    justify-content: space-between;
  }
  
  .location-inputs div {
    flex: 1;
    margin-right: 1rem;
  }
  
  .location-inputs div:last-child {
    margin-right: 0; 
  }
  
  .btn-submit {
    display: inline-block;
    width: 100%;
    padding: 0.5rem;
    background-color: #ffcc00; 
    color: black; 
    border: none;
    border-radius: 4px;
    font-size: 1.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-submit:hover {
    background-color: #ffd700; 
  }
  </style>
  