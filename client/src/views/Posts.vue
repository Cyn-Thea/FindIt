<template>
      <div class="container-md">
       <b-button
          variant="outline-warning"
          class="btn-style btn-lost"
          title="Filter by lost"
          v-on:click="retrieveAllPosts()"
          >Explore</b-button >
          <b-button
          variant="outline-info"
          class="btn-style btn-lost"
          title="Filter by lost"
          v-on:click=";(selectedCategory = 'lost'), sortByCategory()"
          >Lost</b-button >
         <b-button
          variant="outline-success"
          class="btn-style btn-found"
          title="Filter by found"
          v-on:click=";(selectedCategory = 'found'), sortByCategory()"
          >Found</b-button>
      <b-container class="list">
        <b-card v-for="post in posts"
        v-bind:key="post._id"
        class="listitem"
        align-h="center">
            <b-col>{{ post.catergory }}</b-col>
            <b-col>Post by: {{ post.author}}</b-col>
            <b-col>Title: {{ post.title }}</b-col>
            <b-col> Description: {{ post.description }}</b-col>
            <b-col> Found at: {{ post.building }}</b-col>
          <b-card>
             <a :href="'/posts/' + post._id" size="sm">view all comments</a>
          </b-card>
        </b-card>
      </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'posts',
  mounted() {
    this.retrieveAllPosts()
  },
  data() {
    return {
      posts: [],
      selectedCategory: '',
      error: ''
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
      Api.get('/postFiltered?catergory=' + this.selectedCategory)
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
