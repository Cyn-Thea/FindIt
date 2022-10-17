<template>
  <div id="Postpage">
      <div id="header">
           <h2 id = "username-lbl"> Manage your Posts</h2>
        </div>
      <p v-if="!posts.length && message === ''">You have not made any posts yet.</p>
     <div v-for="post in posts" v-bind:key="post._id" id="commentscontainer">
      <userItem :post="post" v-on:delete-post="deletePost"></userItem>
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
            this.message = 'Could not find the user'
          }
        } else {
          this.message = 'Could not load the user, please try again later'
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
            console.log(this.message)
          }
        } else {
          this.message = 'Could not load the posts, please try again later'
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
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          this.message = response.data
          const index = this.posts.findIndex(post => post._id === id)
          this.posts.splice(index, 1)
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
