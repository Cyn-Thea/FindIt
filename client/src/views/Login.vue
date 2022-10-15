<template>
<div class="container-sm">
    <b-form @submit.prevent="handleSubmit">
      <div class="header">
        <h1>Login</h1>
      </div>
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        {{ message}}
    </b-alert>
     <b-container class="listitem">
      <div>
    <img style="max-width:200px;
        max-height: 100px;
       " src="../assets/default.jpg"></div>
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
      <div id="buttons">
      <button class="btn btn-primary">Login</button>
      </div>
       </b-container>
      <b-form-group>
        <b-form-text class="text-left"
          >Dont have an acccount?
          <router-link to="/signUp">Sign Up</router-link>
        </b-form-text>
        </b-form-group>
    </b-form>
    </div>
  </template>

<script>
import { Api } from '@/Api'

export default {
  name: 'login',
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
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/posts')
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

<style>
.container-sm {
  margin-top: 2em;
}
.btn-primary{
   box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
#buttons{
  color: skyblue;
}
.header {
  margin-bottom: 0.5em;
  padding: 20px;
  text-align: center;
  background: #5fb1ca;
  color: rgb(246, 245, 246);
  font-size: 50px;
  font-family: Trebuchet MS;
}
</style>
