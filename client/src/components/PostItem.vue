<template>
  <div class="container postsitem">
    <div class="row" >
        <b-card>
        <b-col>Comment by: {{ post.author}}</b-col>
      <div class="col-12">
        <p> <b-col> {{ post.description }}</b-col></p>
      </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postItem',
  props: ['post']
}
</script>
