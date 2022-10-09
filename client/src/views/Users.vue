<template>
      <div class="container-md">
       <b-button
          variant="outline-warning"
          class="btn-style mb-4 ml-3"
          title="All posts"
          v-on:click="retrieveAllUsers()"
          >Explore</b-button >
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
  }
}
</script>
