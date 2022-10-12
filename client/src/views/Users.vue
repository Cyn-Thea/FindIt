<template>
      <div class="container-md">
       <b-button
          id="delete"
          title="All posts"
          v-on:click="retrieveAllUsers()"
          >Delete All Users</b-button >
      <b-container class="listitem"
         v-for="user in users"
        v-bind:key="user._id"
        align-h="center">
            <b-col> Username: {{ user.username }}</b-col>
            <b-col> First Name: {{ user.firstName }}</b-col>
            <b-col> Last Name: {{ user.lastName}}</b-col>
            <b-col> Email: {{ user.email}}</b-col>
      </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'users',
  props: ['user'],
  mounted() {
    console.log('PAGE is loaded')
    this.retrieveAllUsers()
  },
  data() {
    return {
      users: [],
      error: ''
    }
  },
  methods: {
    retrieveAllUsers() {
      Api.get('/users')
        .then((response) => {
          this.users = response.data.users
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateUser() {
      const updateUser = {
        firstName: this.firstName,
        lastName: this.lastName,
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
    /* deleteAllUsers() {
      Api.delete('/users')
        .then((response) => {
          this.users = response.data.users
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } */
  }
}
</script>

<style>
#delete {
  background-color: #e80d0d; /* Green */
  border: none;
  color: white;
  padding: 10px 9px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
}
</style>
