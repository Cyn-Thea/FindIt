<template>
  <div id="Postpage">
      <div id="header">
          <h1>Comments</h1>
          <h2> Title: {{ post.title }}</h2>
        </div>
         <b-button :href="'/addcomment/' + post._id"
          size="sm"
          variant="outline-info"
          >Add Comment</b-button>
      <p v-if="!comments.length && message === ''">There are no comments yet.</p>
     <div v-for="comment in comments" v-bind:key="comment._id" id="commentscontainer">
      <commentItem :comment="comment" v-on:delete-comment="deleteComment"></commentItem>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import commentItem from '@/components/Comment.vue'

export default {
  name: 'post',
  components: { commentItem },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/posts/' + this.$route.params.id)
      .then(response => {
        this.post = response.data
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            this.message.post = 'Could not find the post'
          }
        } else {
          this.message.post = 'Could not load the post, please try again later'
        }
        this.showDismissibleAlert1 = true
        this.post = {}
      })

    Api.get('/posts/' + this.$route.params.id + '/comments')
      .then(response => {
        this.comments = response.data.comments
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            console.log(this.message)
          }
        } else {
          this.message = 'Could not load the comments, please try again later'
        }
        this.comments = []
      })
  },
  data() {
    return {
      post: '',
      comments: [],
      message: '',
      text: ''
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
.comment {
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: rgb(255, 255, 255);
  color: #032c47;
  border: 0.5px solid #0f6a7c;
  border-radius: 50px;
  padding: 6px 9px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
#header {
  margin-bottom: 0.5em;
  margin-top: 0.8em;
  margin-left: 1em;
  margin-right: 1em;
  padding: 10px;
  text-align: center;
  background: #5fb1ca;
  color: rgb(246, 245, 246);
  font-size: 50px;
  font-family: Trebuchet MS;
}
#commentButton{
  background-color: #1a37ca;
  margin-bottom: 0.5em;
  margin-top: -0.8em;
  border: none;
  color: white;
  padding: 6px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
