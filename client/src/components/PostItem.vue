<template>
  <div class="card">
    <div class="title">
      <div class="title-body">
        <div>
          <p>{{ post.catergory }}</p>
        </div>
        <div class="title-col2">
          <b-icon
            icon="pencil"
            id="edit-button"
            v-on:click="$emit('load-project', post._id)">
          </b-icon><span>     </span>
          <b-button-close v-on:click="$emit('delete-post', post._id)">&times;</b-button-close>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div>
        <p class="attribute">Status: </p>
        <p class="attribute">Priority:</p>
        <p class="attributenotes">Notes:</p>
      </div>

      <div>
        <p>{{ post.title }}</p>
        <p>{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  props: ['post'],
  methods: {
  }
}
</script>

<style scoped>

#edit-button {
  cursor: pointer;
}

.card {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid #000000;
  background-color: white;
  text-align: left;
  float: left;
  transition: box-shadow 0.2s;
}
.card-body {
  display: grid;
  grid-template-columns: 75px 150px;
  grid-column-gap: 0px;
}

.card:hover {
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: bold;
  font-size: 1rem;
  background-color: #f6be7b;
  border-bottom: 2px solid #000000;
}

.title-body {
  display: grid;
  grid-template-columns: 220px 35px;
  grid-column-gap: 0px;
}

.title-col2 {
  align-content: right;
}

p {
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
  margin: 0px;
  font-size: 1rem;
}

p.attributenotes {
  font-weight: bold;
}

.icons {
  float: right;
}

@media (max-width: 600px) {
  .notes {
    display: none;
  }
  .attributenotes {
    display: none;
  }
}
</style>
