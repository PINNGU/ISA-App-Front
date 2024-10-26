<template>
  <div>
    <AddPost />


  </div>
</template>

<script>
import AddPost from '../components/AddPost.vue';
import axios from 'axios';

export default {
  components: {
    AddPost,
  },
  data() {
    return {
      post: null, 
    };
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/');
        this.post = response.data; 
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
  },
  mounted() {
    this.fetchPost(); 
  },
};
</script>

<style scoped>

</style>
