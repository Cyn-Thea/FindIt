<template>
<div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="info" class="navigation" >
      <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav-item" href="/posts">Posts</b-nav-item>
          <b-nav-item class="nav-item" href="/users">Users</b-nav-item>
          <b-nav-item class="nav-item" href="/createPost">Create Post</b-nav-item>
          <b-nav-item-dropdown text="Settings" right>
           <b-dropdown-item href="/profile">Profile</b-dropdown-item>
           <b-dropdown-item  @click="logout">Logout</b-dropdown-item>
           <b-dropdown-item @click="$bvModal.show('bv-modal')">Deactivate Account</b-dropdown-item>
         </b-nav-item-dropdown>
      </b-navbar-nav>
          <b-modal id="bv-modal" hide-footer>
       <template #modal-title>Delete Account</template>
       <div class="d-block text-center">
         <h3>Are you sure you want to permanetly delete your account?</h3>
        </div>
       <b-button type="button" class="btn btn-danger mb-9 ml-3" @click="deleteAccount">Delete</b-button>
       <b-button type="button" class="btn btn-secondary mb-9 ml-3" @click="$bvModal.hide('bv-modal')">Cancel</b-button>
       </b-modal>
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
      this.$router.push('/')
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
    },
    deleteAccount() {
      Api.delete(`/users/${this.user.id}`)
        .then((res) => {
          localStorage.clear()
          console.log(res)
          this.$router.push('/', this.$router.go(0))
        })
        .catch((error) => {
          console.log(error)
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
  color: #01080e;
}
a:hover, a:active {
  background-color: #7fb4c6;
  color: white;
}
html body {
  background-color: #bfe7f0;
}
@media only screen and (min-device-width: 360px) and (max-device-height: 768px) and (-webkit-device-pixel-ratio: 3) {
  .navigation {
    position: sticky-bottom;
  }
  .ml-auto {
    margin-right: 0;
  }
}
</style>
