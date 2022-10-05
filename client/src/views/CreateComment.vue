<template>
    <div>
        <div class="head">
          <h1>Create comment</h1>
        </div>
       <div class="form-group">
          <input
            type="author"
            class="form-control"
            v-model="author"
            placeholder="author"
          />
        </div>
        <div class="form-group">
          <input
            type="comment"
            class="form-control"
            v-model="comment"
            placeholder="comment"
          />
        </div>
        <button @click="CreateReview">Post</button>
    </div>
  </template>

<script>

import { Api } from '@/Api'
export default {
  name: 'addcomment',
  data() {
    return {
      author: '',
      comment: '',
      post_data: '',
      error: ''
    }
  },
  methods: {
    CreateReview() {
      const newPost = {
        author: this.$route.params.id, // refrencing post not user
        comment: this.comment,
        post_data: this.$route.params.id
      }
      Api.post('/posts/' + this.$route.params.id + '/comments', newPost).then(
        (res) => {
          console.log(res)
          this.$router.push('/posts')
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
        }
      )
    }
  }
}
</script>
