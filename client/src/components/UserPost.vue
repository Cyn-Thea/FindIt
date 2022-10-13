<template>
  <div class="container">
    <div class="row" >
       <b-container class="listitem">
        <p><b-col>{{ post.category}}</b-col></p>
        <b-col>Title: {{ post.title}}</b-col>
         <b-col>Description: {{ post.description}}</b-col>
        <b-col> Location : {{ post.building }}</b-col>
        <b-col> Posted On : {{ post.date}}</b-col>
        <b-button variant="danger" v-on:click="$emit('delete-post', post._id)">Delete</b-button>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userItem',
  props: ['post']
}
</script>

<style>
p {
  color: rgb(18, 68, 133);
  background-color: rgb(125, 184, 190);
  border: 2px solid #12579b;
  border-radius: 90px;
  font-family: courier;
  font-size: 150%;
}
</style>
