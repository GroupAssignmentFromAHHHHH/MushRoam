<template>
  <section>
    <div class="container-create-inputs">
      <form @submit.prevent="postPost">
        <div id="formgroup-1" class="formgroup">
          <div class="img-upload">
           
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
            placeholder="Species"
          />
        </div>
        <div class="formgroup">
          <label for="location"></label>
          <input
            v-model="location"
            type="text"
            name="location"
            id="location"
            placeholder="Location"
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
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          species: this.species,
          location: this.location,
          description: this.description,
        }),
      });
      const data = await response.json();
      console.log(data);
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

.img-upload {
  width:30%;
  background-color: rgb(224, 224, 224);
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
  display: flex;
  width: 100vw;
  height: 100vh;
}

.container-create-inputs {
  margin-top: 2em;
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
}
</style>