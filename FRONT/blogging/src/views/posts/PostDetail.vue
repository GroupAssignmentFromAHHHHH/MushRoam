<template>
  <section>
    <h2>Single Post</h2>
    <div class="newsfeed">
      <ul>
        <li class="posts" v-if="post">
          <div class="author">
            <p>{{ post.author.username }}</p>
            <div class="button-box">
              <button>edit</button>
              <button @click="deletePost">Delete Post</button>
            </div>
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
  name: "PostDetail",
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

    async deletePost() {
      const response = await fetch(
        "http://localhost:3000/posts/" + this.post._id,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      this.$router.push({ name: "PostList" });
    },
    async postComment() {
      const comment = {};
      comment.text = this.comment.text;
      if (this.comment.author) {
        comment.author = this.comment.author;
      }
      this.comment = { text: null, author: null };
      const response = await fetch(
        "http://localhost:3000/posts/" + this.post._id + "/comments/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comment),
        }
      );
      const data = await response.json();
      this.getPost();
    },
    async deleteComment(commentId) {
      const response = await fetch(
        "http://localhost:3000/posts/" +
          this.post._id +
          "/comments/" +
          commentId,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      this.getPost();
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
  box-shadow: none;
  margin: 0 0 3em 0;
  border-radius: 0.5em;
  min-height: 20em;
  position: relative;
  border: thin rgb(231, 231, 231) solid;
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

.button-box {
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
}
</style>
