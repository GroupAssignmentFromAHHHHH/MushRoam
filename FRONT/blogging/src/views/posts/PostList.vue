<template>
  <section>
    <h2>Newsfeed</h2>
    <div class="newsfeed">
      <ul>
        <li class="posts" v-for="post of posts" :key="post._id">
          <div class="author">
            <p>{{ post.author.username}}</p>
          </div>
          <div class="img-box"></div>
          <div class="data">
            <router-link 
            :to="{ name: 'PostDetail', params: { postId: post._id } }" 
          >
            <p>{{ post.description }}</p></router-link
          >
          
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
import PostCreate from "./PostCreate.vue";
export default {
  name: "PostList", // the name of the component (helps with debugging)
  components: { // the list of registered subcomponents
    PostCreate, 
  },
  data() {  // the data object that contains the data that vue will make available to the template to render
    return {
      posts: [],
    };
  },
  mounted() { // the mounted lifecycle hook, which executes its code block whenever an instance of this component is rendered into the DOM
    this.getPosts();
  },
  methods: { // the set of methods this component can execute

  // this method uses fetch() to send a GET request to the API, and then awaits the response, which it then decodes from JSON to standard JS objects, and stores it in data()
    async getPosts() {
      const response = await fetch("http://localhost:3000/posts"); // send request to server and await response
      const data = await response.json(); // begin decoding from JSON to standard JS and await completion of download/conversion
      this.posts = data; // then put the decoded response into the data, making it available to the template to read and render
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
