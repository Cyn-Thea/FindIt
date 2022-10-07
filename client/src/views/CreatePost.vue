<template>
<form @submit.prevent="handleSubmit">
    <div>
        <div class="head">
          <h1>Create Post</h1>
        </div>
           <div class="form-group">
            <label for="category" class="col-4 col-form-label">Category:</label>
            <select
            id="category"
            type="category"
            class="form-control"
            v-model="category"
            placeholder="category">
              <option>lost</option>
              <option>found</option>
            </select>
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
            type="description"
            class="form-control"
            v-model="description"
            placeholder="description"
          />
        </div>
        <div class="form-group">
          <input
            type="location"
            class="form-control"
            v-model="building"
            placeholder="location details"
          />
        </div>
         <button class="btn btn-primary btn-block">Post</button>
    </div>
    </form>
  </template>

<script>

import { Api } from '@/Api'
export default {
  name: 'CreatePost',
  props: {
    user: Object
  },
  data() {
    return {
      category: '',
      title: '',
      description: '',
      building: '',
      room: '',
      author: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const newPost = {
        category: this.category,
        title: this.title,
        description: this.description,
        building: this.building,
        room: this.room,
        author: this.user.id // refrence the user
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
