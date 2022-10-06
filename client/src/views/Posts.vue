<template>
    <div>
      <h1>Explore</h1>
       <b-button
          class="btn-style btn-lost"
          title="Filter by lost"
          v-on:click=";(selectedCategory = 'lost'), sortByCatergory()"
          >Lost</b-button >
         <b-button
          class="btn-style btn-found"
          title="Filter by found"
          v-on:click=";(selectedCategory = 'found'), sortByCatergory()"
          >Found</b-button>
      <b-container class="list">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ message }}
        </b-alert>
        <b-row id="loading" v-bind:class="isLoading">
        </b-row>
        <p v-if="!posts.length && isLoading === 'hideLoading'">There are no posts yet.</p>
        <b-row v-for="post in posts" v-bind:key="post._id" class="listitem">
            <b-card>
            <b-col>{{ post.catergory }}</b-col>
            <b-col>Post by: {{ post.author}}</b-col>
            <b-col>Title: {{ post.title }}</b-col>
            <b-col> Description: {{ post.description }}</b-col>
            <b-col> Found at: {{ post.building }}</b-col>
          <b-card>
            <h2>Comments</h2>
             <a :href="'/posts/' + post._id" size="sm">view all comments</a>
          </b-card>
        </b-card>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'posts',
  props: {
    user: Object
  },

  mounted() {
    Api.get('/posts')
      .then(response => {
        this.isLoading = 'hideLoading'
        this.posts = response.data.posts
      })
      .catch(error => {
        this.isLoading = 'hideLoading'
        if (error.response) {
          if (error.response.status === 404) {
            this.message = 'Could not find any posts'
          }
        } else {
          this.message = 'Could not load the Posts, please try again later'
        }
        this.showDismissibleAlert = true
      })
  },
  data() {
    return {
      posts: [],
      sortedPosts: [],
      message: '',
      selectedCategory: '',
      showDismissibleAlert: false,
      isLoading: '',
      error: ''
    }
  },
  methods: {
    sortByCatergory() {
      Api.get('/postFiltered?catergory=' + this.selectedCategory)
        .then((response) => {
          this.sortedPosts = response.data.sortedPosts
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
