<template>
<div class="container-sm">
<b-form @submit.prevent="handleSubmit">
    <div>
        <div class="header">
          <h1>Sign Up</h1>
        </div>
         <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        {{ message}}
         </b-alert>
         <b-container class="listitem">
         <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="lastName"
            placeholder="Enter your last name"
          />
        </div>
         <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
       <div class="form-group">
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
         <button class="btn btn-primary">Create Account</button>
         </b-container>
          <b-form-group>
        <b-form-text class="text-left"
          >Already have an account?
          <router-link to="/">Login</router-link>
        </b-form-text>
        </b-form-group>
    </div>
     </b-form>
     </div>
  </template>

<script>

import { Api } from '@/Api'
export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
      message: '',
      showDismissibleAlert: false
    }
  },
  methods: {
    handleSubmit() {
      const newUser = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      Api.post('/signUp', newUser).then(
        (res) => {
          console.log(res)
          this.error = ''
          this.$router.push('/')
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.message = 'Invalid credentials'
          this.showDismissibleAlert = true
        }
      )
    }
  }
}
</script>
