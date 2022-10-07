<template>
<form @submit.prevent="handleSubmit">
    <div class="profile">
    <div class="container-md">
        <h2>Account Settings</h2>
        <div class="profile-info">
          <router-view v-bind:user="user" />
          <div class="input">
            <label for="username">User Name:</label>
            <input disabled type="text" id="username" v-model="username" />
          </div>
          <div class="input">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" v-model="firstName" />
          </div>
          <div class="input">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" v-model="lastName" />
          </div>
          <div class="input">
            <label for="email">Email  :    </label>
            <input disabled type="text" id="email" v-model="email" />
          </div>
          <div class="input">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />
          </div>
           <button class="btn btn-primary btn-block">Save Changes</button>
          <button @click="deleteAccount">Delete Account</button>
        </div>
      </div>
       <h2>Your Posts</h2>
       <b-row align-h="center">
        <b-col cols="12" sm="6" md="4" v-for="post in posts" v-bind:key="post._id">
            <post-item v-bind:project="project" v-on:delete-project="deleteProject" v-on:load-project="loadProject"/>
        </b-col>
      </b-row>
    </div>
    </form>
  </template>

<script>

import { Api } from '@/Api'
import PostItem from '@/components/PostItem.vue'

export default {
  name: 'Profile',
  components: {
    PostItem
  },
  props: {
    user: Object
  },
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      university: '',
      campus: '',
      id: '',
      userID: localStorage.getItem('token'),
      posts: []
    }
  },
  // if user is not authorized return to login page
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.loadAllPosts()
    Api.get('/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        this.username = res.data.user.username
        this.firstName = res.data.user.firstName
        this.lastName = res.data.user.lastName
        this.email = res.data.user.email
        this.password = res.data.user.password
        this.campus = res.data.user.campus
        this.university = res.data.user.university
        this.id = res.data.user.id
      })
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
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
    },
    handleSubmit() {
      const updateUser = {
        firstName: this.firstName || this.user.firstName,
        lastName: this.lastName || this.user.lastName,
        password: this.password || this.user.password
      }
      Api.patch(`/users/${this.user.id}`, updateUser).then(
        (res) => {
          console.log(res)
          this.$router.push('/home')
        },
        (err) => {
          console.log(err.response)
        }
      )
    },
    loadAllPosts() {
      Api.get('/users/' + localStorage.getItem('token') + '/posts')
        .then(response => {
          console.log(response.data)
          this.posts = response.data.posts
        })
        .catch(error => {
          this.message = error.message
          console.log(error)
          this.posts = []
        })
    }
  }
}
</script>
