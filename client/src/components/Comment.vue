<template>
  <div class="container reviewsitem">
    <div class="row" >
        <b-card>
        <b-col>Author: {{ comment.author}}</b-col>
      <div class="col-12">
        <p> <b-col>Title: {{ comment.comment }}</b-col></p>
      </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['comment']
}
</script>
