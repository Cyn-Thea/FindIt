<template>
<div class="container-sm">
<b-form @submit.prevent="handleSubmit">
    <div>
        <div class="header">
          <h1>Create Post</h1>
        </div>
        <b-container class="listitem">
           <div class="form-group">
            <select
            id="category"
            type="category"
            class="form-control"
            v-model="category"
            placeholder="category">
             <option disabled value="">Select post type</option>
              <option>LOST</option>
              <option>FOUND</option>
            </select>
        </div>
       <div class="form-group">
          <input
            type="title"
            class="form-control"
            v-model="title"
            placeholder="Enter the title e.g name of the item"
          />
        </div>
        <div class="form-group">
          <input
            type="description"
            class="form-control"
            v-model="description"
            placeholder="Enter item Description"
          />
        </div>
        <div class="form-group">
          <input
            type="location"
            class="form-control"
            v-model="building"
            placeholder="Enter item location"
          />
        </div>
         <button class="btn btn-primary">Post</button>
        </b-container>
    </div>
    </b-form>
     </div>
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
      Api.post('/users/' + this.user.id + '/posts', newPost).then(
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
