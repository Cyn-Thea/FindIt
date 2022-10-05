<template>
    <div>
      <h1>all Posts</h1>
      <b-container class="list">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ message }}
        </b-alert>
        <b-row id="loading" v-bind:class="isLoading">
        </b-row>
        <p v-if="!posts.length && isLoading === 'hideLoading'">There are no posts yet.</p>
        <b-row v-for="post in posts" v-bind:key="post._id" class="listitem">
            <b-card>
              <b-col>catergory: {{ post.catergory }}</b-col>
                <b-col>Author: {{ post.author}}</b-col>
            <b-col>Title: {{ post.title }}</b-col>
          <b-col> Description: {{ post.description }}</b-col>
          <b-col> Found at: {{ post.building }}</b-col>
          <b-col> room: {{ post.room }}</b-col>
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

  mounted() {
    console.log('All posts page is loaded')
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
        this.posts = []
        this.showDismissibleAlert = true
      })
  },
  data() {
    return {
      posts: [],
      message: '',
      showDismissibleAlert: false,
      isLoading: ''
    }
  }
}
</script>
