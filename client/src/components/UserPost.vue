<template>
  <div class="container">
    <div class="row" >
       <b-container class="listitem">
        <b-col>post tile: {{ post.title}}</b-col>
         <b-col>post tile: {{ post.building}}</b-col>
      <div class="col-12">
        <p> <b-col> {{ post.description }}</b-col></p>
      </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postItem',
  props: ['post']
}
</script>

<style >

</style>
