<template>
    <div>
        <div class="head">
          <h1>Sign Up</h1>
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
          />
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
        <button @click="signUp">SignUp</button>
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
      error: ''
    }
  },
  methods: {
    signUp() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      Api.post('/users', newUser).then(
        (res) => {
          console.log(res)
          this.$bvModal.msgBoxOk('SignUp Successful', this.$router.go(0))
          this.$router.push('/')
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
      )
    }
  }
}
</script>
