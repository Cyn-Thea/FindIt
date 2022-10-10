<template>
  <div id="Postpage">
      <div id="header">
           <h2 id = "username-lbl"> Hey {{ user.username }}</h2>
        </div>
      <p v-if="!posts.length && message === ''">There are no posts yet.</p>
     <div v-for="post in posts" v-bind:key="post._id" id="commentscontainer">
      <userItem v-bind:post="post" v-on:delete-post="deletepost"></userItem>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import userItem from '@/components/UserPost.vue'

export default {
  name: 'user',
  components: { userItem },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/users/' + this.$route.params.id)
      .then(response => {
        this.user = response.data
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            this.message.user = 'Could not find the user'
          }
        } else {
          this.message.user = 'Could not load the user, please try again later'
        }
        this.showDismissibleAlert1 = true
        this.user = {}
      })

    Api.get('/users/' + this.$route.params.id + '/posts')
      .then(response => {
        this.posts = response.data.posts
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            this.message.posts = 'Could not find any posts'
            console.log(this.message.posts)
          }
        } else {
          this.message.posts = 'Could not load the posts, please try again later'
        }
        this.posts = []
      })
  },
  data() {
    return {
      user: '',
      posts: [],
      message: ''
    }
  },
  methods: {
    deleteComment(id) {
      // Delete from the API database
      Api.delete('/posts/' + this.$route.params.id + `/comments/${id}`)
        .then(response => {
          this.message = response.data
          // Delete the review from the data array
          const index = this.comments.findIndex(review => review._id === id)
          this.comments.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
p {
  color: red;
  font-family: courier;
  font-size: 150%;
}
</style>
