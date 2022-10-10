<template>
      <div class="container-md">
       <b-button
          variant="outline-warning"
          class="btn-style mb-4 ml-3"
          title="All posts"
          v-on:click="retrieveAllPosts()"
          >Explore</b-button >
          <b-button
          variant="outline-info"
          class="btn-style mb-4 ml-3"
          title="Filter by lost"
          v-on:click=";(selectedCategory = 'lost'), sortByCategory()"
          >Lost</b-button >
         <b-button
          variant="outline-success"
          class="btn-style mb-4 ml-3"
          title="Filter by found"
          v-on:click=";(selectedCategory = 'found'), sortByCategory()"
          >Found</b-button>
      <b-container class="listitem"
         v-for="post in posts"
        v-bind:key="post._id"
        align-h="center">
            <b-col>{{ post.category }}</b-col>
            <b-col>Post by: {{ post.author}}</b-col>
            <b-col>Title: {{ post.title }}</b-col>
            <b-col> Description: {{ post.description }}</b-col>
            <b-col> Found at: {{ post.building }}</b-col>
          <b-card class="comment-listitem" >
             <a :href="'/posts/' + post._id">view all comments</a>
          </b-card>
      </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'posts',
  props: ['post'],
  mounted() {
    console.log('PAGE is loaded')
    this.retrieveAllPosts()
  },
  data() {
    return {
      posts: [],
      error: ''
    }
  },
  computed: {
    isAuthor() {
      const username = JSON.parse(localStorage.getItem('currentUser'))
      return this.post.author === username
    }
  },
  methods: {
    retrieveAllPosts() {
      Api.get('/posts')
        .then((response) => {
          this.posts = response.data.posts
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sortByCategory() {
      Api.get('/postFiltered?category=' + this.selectedCategory)
        .then((response) => {
          this.posts = response.data.posts
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.listitem {
  margin-bottom: 1em;
  background-color: rgb(219, 237, 239);
  color: #000000;
  border: 2px solid #087d94;
  border-radius: 10px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.container-md {
  margin-top: 1em;
}
.btn-style {
  font-family: "Century Gothic",Verdana,sans-serif;
  width: 85px;
  height: 50px;
}

</style>
