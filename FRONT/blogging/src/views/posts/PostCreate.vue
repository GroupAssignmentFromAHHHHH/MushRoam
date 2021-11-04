<template>
  <section>
    <h2>Create New Post</h2>

    <div class="container-create-inputs">
      <form @submit.prevent="postPost" enctype="multipart/form-data">
        <div id="formgroup-1" class="formgroup">
          <div class="img-upload">
            <label for="image"></label>
            <input
              type="file"
              @change="imageUpload"
              name="image-upload"
              id="image-upload"
              class="image-upload"
            />
          </div>
          <label for="description"></label>
          <textarea
            v-model="description"
            type="text"
            name="description"
            id="description"
            cols="15"
            rows="10"
            placeholder="Write a caption..."
          >
          </textarea>
        </div>
        <div class="formgroup">
          <label for="species"></label>
          <input
            v-model="species"
            type="text"
            name="species"
            id="species"
            placeholder="Species of Mushroom"
          />
        </div>
        <div class="formgroup">
          <label for="location"></label>
          <input
            v-model="location"
            type="text"
            name="location"
            id="location"
            placeholder="Location (optional)"
          />
        </div>

        <button type="submit">Create Post</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["posted"],
  name: "PostCreate",
  data() {
    return {
      species: null,
      location: null,
      description: null,
    };
  },
  methods: {
    async postPost() {
      const post = {};
     
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
    },
  },
};
</script>

<style scoped>
#formgroup-1 {
  display: flex;
}

.formgroup {
  margin-bottom: 2em;
  display: block;
}

.formgroup input {
  width: 100%;
  height: 3em;
  border: none;
  border-bottom: thin rgb(187, 187, 187) solid;
  outline: none;
  padding: 0.5em;
}

.img-upload input {
  height: 100%;
  width: 100%;
}

.img-upload {

  width: 30%;
  background-color: rgb(221, 221, 221);
}

.formgroup textarea {
  padding: 0.5em;
  outline: none;
  width: 70%;
  height: 7em;
  border: none;
  border-bottom: thin rgb(187, 187, 187) solid;
}

section {
  width: 100vw;
  padding-top: 5em;
}

section h2 {
  font-weight: 700;
}

.container-create-inputs {
  margin-top: 1em;
  background-color: white;
  padding: 1.5em;
  width: 100%;
  position: relative;
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
</style>