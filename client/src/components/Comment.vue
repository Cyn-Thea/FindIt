<template>
  <div class="container reviewsitem">
    <div class="row" >
       <b-container class="listitem">
        <b-col>Comment by: {{ comment.author}}</b-col>
      <div class="col-12">
        <p> <b-col> {{ comment.comment }}</b-col></p>
      </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['comment']
}
</script>
