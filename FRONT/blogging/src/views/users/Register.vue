<template>
  <section>
    <div class="container">
    <h2>Sign Up to Mushroam</h2>
    <form @submit.prevent="registerUser">
      <div class="formgroup">
        <label for="username"></label>
        <input
          v-model="user.username"
          type="username"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
      <div class="formgroup">
        <label for="password"></label>

        <input
          v-model="user.password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="formgroup">
        <button type="submit">Sign Up</button>
      </div>
    </form>
    </div>
    <!-- {{user}} -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async registerUser() {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user),
      });
      const userData = await response.json();
      console.log(userData);
    },
  },
};
</script>

<style scoped>
.container h2 {
  color: white;
  font-weight:700;
}

.container {
  margin-top: 12em;
}

section {
  background-color: #740214;
  height:100vh;
  overflow-y: hidden;
}

.formgroup {
  display: block;
  margin: 2em auto;
}

.formgroup input {
  border-radius: 1em;
  width: 70%;
  height: 3em;
  border: none;
  border-bottom: thin rgb(187, 187, 187) solid;
  outline: none;
  padding: 0.5em;
}

button {
  font-family: 'Montserrat', sans-serif;
  font-weight:700;
  cursor: pointer;
  color: #740214;
  border-radius: 2em;
  background-color: white;
  border: none;
  height: 3em;
  width: 40%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  
}
</style>