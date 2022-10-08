<template>
<div class="container-sm">
<b-form @submit.prevent="handleSubmit">
    <div>
        <div class="header">
          <h1>Create comment</h1>
        </div>
        <b-avatar
        size="3.5em"
        variant="secondary">
        </b-avatar>
        <b-card-sub-title class="mb-2">{{ user.username }}</b-card-sub-title>
        <div class="form-group">
          <input
            type="comment"
            class="form-control"
            v-model="comment"
            placeholder="add a comment"
          />
        </div>
        <button class="btn btn-primary">Post</button>
    </div>
    </b-form>
     </div>
  </template>

<script>

import { Api } from '@/Api'
export default {
  name: 'addcomment',
  props: {
    user: Object
  },
  data() {
    return {
      author: '',
      comment: '',
      post_data: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const newPost = {
        author: this.user.id, // refrence the user object
        comment: this.comment,
        post_data: this.$route.params.id // reference post
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
