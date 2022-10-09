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
            <b-col>{{ user.username }}</b-col>
            <b-col>Post by: {{ user.email}}</b-col>
          <b-card class="comment-listitem" >
             <a :href="'/users/' + user._id">view all posts</a>
          </b-card>
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
