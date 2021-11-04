<template>
  <section>
    <h2>Newsfeed</h2>
    <div class="newsfeed">
      <ul>
        <li class="posts" v-for="post of posts" :key="post._id">
          <div class="author">
            <p>{{ post.author.username }} {{ post.author }}</p>
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
  emits: ["posted"],
  name: "PostList",
  components: {},
  data() {
    return {
      posts: [
        {
          id: 1,

          description:
            "This is delicious! Shiitakes harvested fresh from the yard and straight into the ramen noodles! Cheers",
          species: "Shiitake",
          location: "West Auckland",
          author: "ShroomHunter123",
          createdAt: "2021-10-22T03:16:57.434+00:00",
        },
        {
          id: 2,

          description: "Is this edible??",
          species: "Ayahuasca",
          location: "North Shore",
          author: "Joe Rogan",
          createdAt: "2021-10-28T03:27:08.127+00:00",
        },
        {
          id: 3,

          description: "Beautiful fungi with great patterns and colours",
          species: "Fly Agaric",
          location: "Wellington",
          author: "Biggie",
          createdAt: "2020-08-22T03:16:57.434+00:00",
        },
        {
          id: 4,

          description: "Does anyone know what type of mushroom this is?",
          species: "N/a",
          location: "",
          author: "Ruby",
          createdAt: "2021-09-03T03:27:08.127+00:00",
        },
      ],
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
