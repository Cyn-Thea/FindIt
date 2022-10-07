<template>
<div class="container-md">
    <b-form @submit.prevent="handleSubmit">
      <div class="head">
      <h1>Log In</h1>
      </div>
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        {{ message}}
    </b-alert>
      <div class="form-group">
        <b-input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
        />
      </div>
<div class="form-group">
        <b-input
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
    </b-form>
    </div>
  </template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      message: '',
      showDismissibleAlert: false
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
            this.$router.push('/home')
          }
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.message = 'Invalid login credentials'
          this.showDismissibleAlert = true
        }
      )
    }
  }
}
</script>
