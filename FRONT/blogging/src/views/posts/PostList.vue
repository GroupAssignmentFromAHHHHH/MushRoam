<template>
  <section>
    <svg viewBox="-50 -25 1100 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;">
  <defs>
    <path id="path-1"  fill="none" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
  </defs>

  <text style="fill: var(--text-color);">
    <!-- <textPath xlink:href="#path-1">
      Happy hunting: Put the Fun in Funghi

    </textPath> -->
    <div></div>
  </text>
</svg>

    <div class="newsfeed">
      <img src="smalllogo.png" alt="">
      <ul>
        <li class="posts" v-for="post of posts" :key="post._id" @click="$router.push({ name: 'PostDetail', params: { postId: post._id } })">
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

textpath {
  margin: 2em;
  font-weight: 700;
  color: maroon;
  font-size: 2em;
  z-index: 1000;
}

#path-1 {
  left: 2em;
  right: 2em;
  color: maroon;
}



li p {
  font-size: 0.9em;
  margin-top: 0.5em;
}

.author {
  height: 3em;
  text-align: left;
  font-size: 0.9em;
  padding: 0.5em 0 0 1em;
  background-color: maroon;
}

.author p {
  color: white;
  font-weight: bolder;
}

.posts {
  box-shadow: none;
  border: thin rgb(231, 231, 231) solid;
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

p {
  text-decoration: none;
}
</style>
