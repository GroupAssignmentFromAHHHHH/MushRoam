<template>
  <section>
    <h2>Single Post</h2>
    <div class="newsfeed">
      <ul>
        <li class="posts" v-for="post of posts" :key="post._id">
          <div class="author">
            <p>{{ post.author.username}}</p>
          </div>
          <div class="img-box"></div>
          <div class="data">
            <p>{{ post.description }}</p>
            <p><b>Species:</b> {{ post.species }}</p>
            <p><b>Location: </b> {{ post.location }}</p>
          </div>
          <p class="time">
            {{ new Date(post.createdAt).toLocaleDateString("en-NZ") }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  // emits: ["posted"],
  name: "PostFiltered",
  components: {},
  data() {
    return {
      posts: [
      ],
    };
  },
  mounted() {
    this.getSinglePost();
  },
  methods: {
    async getSinglePost() {
      var result
      var query = { description: "AHHH" };
      const response = await fetch("http://localhost:3000/posts").find(query);
      result = response.toArray(function() {
        console.log(result);
      })
      const data = await result.json();
      this.posts = data;
    },
  },
};
</script>

<style scoped>
section {
  padding-top: 5em;
}

section h2 {
  font-weight: 700;
}

li p {
  font-size: 0.9em;
  margin-top: 0.5em;
}

.author {
  border: thin rgb(231, 231, 231) solid;
  height: 3em;
  text-align: left;
  font-size: 0.9em;
  padding: 0.5em 0 0 1em;
}

.posts {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 0 3em 0;
  border-radius: 0.5em;
  min-height: 20em;
  max-height: 25em;
  position: relative;
}

.data {
  margin: 1em 1em 2em 1em;
  text-align: left;
  font-size: 0.9em;
}

.time {
  bottom: 0;
  right: 0;
  font-size: 0.66em;
  padding: 1em;
  position: absolute;
  color: rgb(78, 78, 78);
}

.img-box {
  height: 11em;
  background-color: rgb(231, 190, 190);
}

.img-box img {
  display: block;
  z-index: 1;
}

.newsfeed {
  width: 100vw;
  padding: 1.5em;
}
</style>
