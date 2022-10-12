<template>
      <div class="container-md">
       <b-button
          id="delete"
          title="All posts"
          v-on:click="deleteAllUsers()"
          >Delete All Users</b-button>
          <div class=" grid">
             <ul v-if="layout === 'grid'" class="card-list">
           <p v-if="!users.length && message === ''">There are no users.</p>
       <b-container class="userlist"
         v-for="user in users"
        v-bind:key="user._id"
        align-h="center">
            <b-col> Username: {{ user.username }}</b-col>
            <b-col> First Name: {{ user.firstName }}</b-col>
            <b-col> Last Name: {{ user.lastName}}</b-col>
            <b-col> Email: {{ user.email}}</b-col>
      </b-container>
       </ul>
    </div>
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
      error: '',
      layout: 'grid',
      message: ''
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
    deleteAllUsers() {
      Api.delete('/users')
        .then((response) => {
          localStorage.clear()
          console.log(response)
          this.$router.push('/', this.$router.go(0))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
#delete {
  background-color: #e80d0d;
  margin-top: 1em;
  border: none;
  color: white;
  padding: 10px 9px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
}
.userlist {
  margin-bottom: 1em;
  margin-top: 1.5em;
  background-color: rgb(125, 176, 188);
  color: #000000;
  border: 2px solid #c41693;
  border-radius: 10px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.card-list {
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
}
@media only screen and (max-width: 768px) {
  .container {
      width: 100%;
  }
  .card-list {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1200px) {
  .container {
      width: 100%;
  }
  .card-list {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
      width: 100%;
  }
  .card-list {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
}
</style>
