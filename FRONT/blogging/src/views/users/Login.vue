<template>
  <section>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="logIn">
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
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
    {{ user }}
  </section>
</template>

<script>
export default {
  emits: ["loggedin"],
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async logIn() {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user),
        credentials: "include",
      });
      const userData = await response.json();

      if (userData.username) {
        window.localStorage.setItem("username", userData.username);
      } 
      this.$emit("loggedin");
    },
  },
};
</script>

<style scoped>
h2 {
  color: white;
}

.container {
  margin-top: 10em;
}

section {
  background-color: #740214;
  height: 100vh;
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
  cursor: pointer;
  color: #740214;
  border-radius: 2em;
  background-color: white;
  border: none;
  height: 3em;
  width: 40%;
  font-weight: bold;
}
</style>