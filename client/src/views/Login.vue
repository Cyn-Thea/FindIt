<template>
    <form @submit.prevent="handleSubmit">
      <div class="head">
      <h1>Log In</h1>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
        />
      </div>
<div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <button class="btn btn-primary btn-block">Submit</button>
      <b-form-group>
        <b-form-text class="text-left"
          >Not a user yet?
          <router-link to="/signUp">Sign Up</router-link>
        </b-form-text>
        </b-form-group>
    </form>
  </template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password
      }
      Api.post('/users/login', user).then(
        (res) => {
          // if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/')
          }
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
        }
      )
    }
  }
}
</script>
