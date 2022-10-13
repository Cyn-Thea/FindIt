import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import CreatePost from './views/CreatePost.vue'
import Profile from './views/Profile.vue'
import Posts from './views/Posts.vue'
import Post from './components/Post.vue'
import CreateComment from './components/CreateComment.vue'
import Users from './views/Users.vue'
import User from './components/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/createComment',
      name: 'createComment',
      component: CreateComment
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/addcomment/:id',
      name: 'addcomment',
      component: CreateComment
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User
    }
  ]
})
