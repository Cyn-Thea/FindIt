<template>
<div class="container-md">
<b-form @submit.prevent="handleSubmit">
    <div>
        <div class="head">
          <h1>Sign Up</h1>
        </div>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        {{ message}}
    </b-alert>
         <div class="form-group">
          <b-input
            type="text"
            class="form-control"
            v-model="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div class="form-group">
          <b-input
            type="text"
            class="form-control"
            v-model="lastName"
            placeholder="Enter your last name"
          />
        </div>
         <div class="form-group">
          <b-input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
       <div class="form-group">
          <b-input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <b-input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
         <b-button class="btn btn-primary btn-block">Submit</b-button>
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
      message: '',
      showDismissibleAlert: false,
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }
      Api.post('/users', newUser).then(
        (res) => {
          console.log(res)
          this.$router.push('/home')
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.message = 'sign up failed, try again'
          this.showDismissibleAlert = true
        }
      )
    }
  }
}
</script>
