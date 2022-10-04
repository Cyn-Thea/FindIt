<template>
    <div>
        <div class="head">
          <h1>Create Post</h1>
        </div>
           <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="catergory"
            placeholder="catergory"
          />
        </div>
       <div class="form-group">
          <input
            type="title"
            class="form-control"
            v-model="title"
            placeholder="title"
          />
        </div>
        <div class="form-group">
          <input
            type="room"
            class="form-control"
            v-model="room"
            placeholder="room"
          />
        </div>
        <div class="form-group">
          <input
            type="description"
            class="form-control"
            v-model="description"
            placeholder="description"
          />
        </div>
        <button @click="CreatePost">Post</button>
    </div>
  </template>

<script>

import { Api } from '@/Api'
export default {
  name: 'CreatePost',
  data() {
    return {
      catergory: '',
      title: '',
      description: '',
      building: '',
      room: '',
      error: ''
    }
  },
  methods: {
    CreatePost() {
      const newPost = {
        catergory: this.catergory,
        title: this.title,
        description: this.description,
        building: this.building,
        room: this.room
      }
      Api.post('/posts', newPost).then(
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
