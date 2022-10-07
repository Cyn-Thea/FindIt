<template>
<div id="app">
    <div id="nav">
      <b-navbar type="dark navbar" variant="dark" class="navigation">
      <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav-item" href="/profile">Profile</b-nav-item>
          <b-nav-item class="nav-item" href="/">Login</b-nav-item>
          <b-nav-item class="nav-item" href="/home">Home</b-nav-item>
          <b-nav-item class="nav-item" href="/createPost">Create Post</b-nav-item>
          <b-nav-item class="nav-item" href="/posts">Posts</b-nav-item>
          <b-nav-item class="nav-item" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
      <router-view v-bind:user="user"/>
    </div>
    <!-- Render the content of the current page view -->
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      isLoggedIn: false,
      user: {},
      post: {}
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/home')
    } else {
      this.isLoggedIn = true
      this.getUser()
      this.getPost()
      this.getComment()
    }
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.isLoggedIn = false
      this.user = {}
      localStorage.clear()
      this.$router.push('/')
    },
    getUser() {
      Api.get('/user', {
        headers: { token: localStorage.getItem('token') }
      }).then((res) => {
        this.user = res.data.user
        console.log(res.data.user)
      })
    },
    getPost() {
      Api.get('/posts').then((res) => {
        this.post = res.data.posts
        console.log(res.data.posts)
      })
    },
    getComment() {
      Api.get('/comments').then((res) => {
        this.comment = res.data.comments
        console.log(res.data.comments)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
