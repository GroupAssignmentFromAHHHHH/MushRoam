<template id="view ">
  <section>
    <h2>Edit Post</h2>
    <div class="newsfeed">
      <ul>
        <div class="posts" v-if="post">
          <div class="author">
            <p>{{ post.author.username }}</p>
            <div class="button-box">
              
              <button @click="$router.push({ name: 'PostDetail', params: { postId: post._id } })">Cancel</button>
            </div>
          </div>
          <div class="img-box"></div>
          <div class="data">
            <form @submit.prevent="updatePost" enctype="multipart/form-data">
            <p> <input v-model="post.description"></p>
            <p><b>Species:</b> <input v-model="post.species"></p>
            <p><b>Location: </b> <input v-model="post.location"></p>
            <button type="submit">Save Changes</button>
            </form>
          </div>
          <p class="time">
            {{ new Date(post.createdAt).toLocaleDateString("en-NZ") }}
          </p>
        </div>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "PostEdit",
  props: {
    postId: String,
  },
  data() {
    return {
      post: null,
      comment: {
        text: null,
        author: null,
      },
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const response = await fetch(
        "http://localhost:3000/posts/" + this.postId
      );
      const data = await response.json();
      this.post = data;
    },

    

    async updatePost(postId) {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          species: this.species,
          location: this.location,
          description: this.description,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      this.$emit("posted");

      app.post("/post/:id", (req, res) => {
  data.findByIdAndUpdate(
    req.params.id,
    { species: this.species,
          location: this.location,
          description: this.description,
           },
  );
});
      this.$router.push({ name: "PostList" });
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: left;
  font-size: 0.9em;
  padding: 0.5em 0 0 1em;
}

.posts {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 0 3em 0;
  border-radius: 0.5em;
  min-height: 20em;
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
button {
  margin-top: 2em;
  cursor: pointer;
  color: white;
  border-radius: 1em;
  background-color: #740214;
  border: none;
  height: 3em;
  width: 80%;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.newsfeed {
  width: 100vw;
  padding: 1.5em;
}

.button-box {
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
}
</style>
