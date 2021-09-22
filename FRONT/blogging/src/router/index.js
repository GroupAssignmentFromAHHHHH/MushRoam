import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue'
import PostList from '../views/posts/PostList'
import PostCreate from '../views/posts/PostCreate'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
