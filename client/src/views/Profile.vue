<template>
<div class="container-sm">
<form @submit.prevent="handleSubmit">
      <div class="header">
        <h1>Account Settings</h1>
      </div>
         <b-container>
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ message }}
      </b-alert>
    </b-container>
    <b-container class="listitem">
          <router-view v-bind:user="user" />
          <div class="input">
            <label for="username">Username:</label>
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
           <button class="btn btn-primary ">Save Changes</button>
           </b-container>
    </form>
    <h2>Your Posts</h2>
    <b-row align-h="center">
       <b-container class="listitem"
        v-for="user in users"
         v-bind:key="user._id">
         </b-container>
        <b-card id="mypostsitem" align-h="center" >
             <a :href="'/users/' + user.id">Manage your posts</a>
          </b-card>
      </b-row>
     </div>
  </template>

<script>

import { Api } from '@/Api'

export default {
  name: 'Profile',
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
      users: [],
      message: '',
      showDismissibleAlert: false
    }
  },
  mounted() {
    Api.get('/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        this.username = res.data.user.username
        this.firstName = res.data.user.firstName
        this.lastName = res.data.user.lastName
        this.email = res.data.user.email
        this.password = res.data.user.password
        this.id = res.data.user.id
      })
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    handleSubmit() {
      const updateUser = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      Api.put(`/users/${this.user.id}`, updateUser).then(
        (res) => {
          console.log(res)
          this.message = 'Your Profile has been updated!'
          this.showDismissibleAlert = true
        },
        (err) => {
          console.log(err.response)
          this.message = 'Profile could not be updated, please try again later'
          this.showDismissibleAlert = true
        }
      )
    }
  }
}
</script>

<style>
  .input {
    margin-top: 0em;
    margin-bottom: 1em;
  }
  label {
    color: #000000;
    display: block;
    width: 100px;
    float: center;
 }
 #mypostsitem{
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  background-color: rgb(125, 184, 190);
  color: #000000;
  border: 2px solid #1681c4;
  border-radius: 10px;
  padding: 2px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
</style>
