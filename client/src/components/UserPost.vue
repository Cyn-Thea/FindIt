<template>
  <div class="container">
    <div class="row" >
       <b-container class="listitem">
        <b-col>Title: {{ post.title}}</b-col>
         <b-col>Description: {{ post.building}}</b-col>
      <div class="col-12">
        <p> <b-col> {{ post.description }}</b-col></p>
      </div>
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

<style >

</style>
