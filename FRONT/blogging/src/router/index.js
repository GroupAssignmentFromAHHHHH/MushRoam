import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue'
import PostList from '../views/posts/PostList'
import PostCreate from '../views/posts/PostCreate'
import Register from '../views/users/Register'
import Login from '../views/users/Login'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/postfeed',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/posts',
    name: 'PostCreate',
    component: PostCreate
  },
  {
    path: '/users/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/users/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
