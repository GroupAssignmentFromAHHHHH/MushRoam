<template>
  <section>
    <h2>Newsfeed</h2>
    <div class="newsfeed">
      <ul>
        <li v-for="post of posts" :key="post._id">
          <h3>{{ post.description }}</h3>
          <h3>{{ post.species }}</h3>
          <h3>{{ post.location }}</h3>
          <h3>{{ post.author.username }} </h3>
          <p>{{ new Date(post.createdAt).toLocaleDateString("en-NZ") }}</p>
        </li>
        
        <li><h3>testing</h3></li>
        <li><h3>testing</h3></li>
        <li><h3>testing</h3></li>
        <li><h3>testing</h3></li>
        <li><h3>testing</h3></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "PostList",
  components: {
    
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      this.posts = data;
    },
  },
};
</script>

<style scoped>
section {
  padding-top: 2em;
}

li {
  border: thin grey solid;
}

.newsfeed {
  width: 100vw;
  padding: 1.5em;
}
</style>
