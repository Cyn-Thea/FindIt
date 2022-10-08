<template>
  <div id="Postpage">
     <b-container class="comment">
     <h1>Comments</h1>
    <h2> Title: {{ post.title }}</h2>
    <b-button :href="'/addcomment/' + post._id" size="sm"  variant="outline-info" class="commentButton">Add Comment</b-button>
     </b-container>
    <b-alert v-model="showDismissibleAlert1" variant="danger" dismissible>
        {{ message.comment}}
    </b-alert>
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
            this.message.comments = 'Could not find any comments'
            console.log(this.message.comments)
          }
        } else {
          this.message.comments = 'Could not load the comments, please try again later'
        }
        this.comments = []
      })
  },
  data() {
    return {
      post: '',
      comments: [],
      message: { comments: '', post: '' },
      text: '',
      showDismissibleAlert1: false,
      showDismissibleAlert2: false
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
</style>
