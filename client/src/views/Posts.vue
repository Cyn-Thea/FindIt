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
          <div class=" grid">
             <ul v-if="layout === 'grid'" class="card-list">
           <p v-if="!posts.length && message === ''">There are no posts yet.</p>
      <b-container class="listitem"
         v-for="post in posts"
        v-bind:key="post._id">
            <b-col>{{ post.category }}</b-col>
            <b-col>Post by: {{ post.author}}</b-col>
            <b-col>Title: {{ post.title }}</b-col>
            <b-col> Description: {{ post.description }}</b-col>
            <b-col> Location details: {{ post.building }}</b-col>
            <b-col> posted on: {{ post.date }}</b-col>
          <b-card id="commentitem" >
             <a :href="'/posts/' + post._id">view all comments</a>
          </b-card>
      </b-container>
         </ul>
    </div>
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
      message: '',
      error: '',
      layout: 'grid'
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

<style scoped>
.listitem {
  margin-bottom: 0em;
  background-color: rgb(219, 237, 239);
  color: #000000;
  border: 2px solid #12579b;
  border-radius: 10px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
#commentitem{
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  background-color: rgb(116, 209, 219);
  color: #000000;
  border: 2px solid #c41693;
  border-radius: 10px;
  padding: 2px 2px;
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
