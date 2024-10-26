import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Login from "../components/Login.vue";       // Import the Login component
import Register from "../components/RegisterForm.vue"; // Import the Register component

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/login", name: "Login", component: Login },         // Add login route
  { path: "/register", name: "Register", component: Register } // Add register route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

