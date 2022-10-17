<template>
  <div class="container">
    <div class="row" >
       <b-container class="listitem">
        <b-col> {{ comment.comment }}</b-col>
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

<style >
.listitem {
  margin-bottom: 1em;
  margin-top: 1em;
  background-color: rgb(219, 237, 239);
  color: #000000;
  border: 2px solid #12579b;
  border-radius: 10px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
</style>
