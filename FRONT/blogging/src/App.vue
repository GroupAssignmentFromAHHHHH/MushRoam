<template>
  <section>
    <header>
      <router-link :to="{ name: 'Home' }"><h4>MUSHROAM</h4> </router-link> 
    </header>

    <div id="nav">
      <router-link :to="{ name: 'PostList' }">Feed</router-link> /
      <router-link :to="{ name: 'PostCreate' }">Create Post</router-link> /
      <router-link :to="{ name: 'About' }">About</router-link> /
      <router-link :to="{ name: 'Register' }">Sign Up</router-link> /
      <router-link v-if="!user" :to="{ name: 'Login' }">Login</router-link>
      <div id="logged" v-else> <a @click="logOut">Log Out</a> </div>
    </div>
    <router-view @loggedin="userLogin" :user="user" />
    
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.userLogin();
  },
  methods: {
    async logOut() {
      const repsonse = await fetch("http://localhost:3000/users/logout", {
        credentials: "include",
      });
      const data = await response.json();
      this.user = window.localStorage.removeItem("username");
      this.user = null;
    },
    userLogin() {
      if (window.localStorage.getItem("username")) {
        this.user = window.localStorage.getItem("username");
      }
    },
  },
};
</script>


<style>
#logged {
  display: inline-block;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
  overflow-x: hidden;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  flex-direction: column;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

header {
  z-index: 999;
  background-color: #740214;
  padding: 1em;
  width: 100%;
  top:0;
  position: fixed;
  border-bottom: thin solid #ffffff;
}

header h4 {
  color: white;
  font-family: 'Arial';
  font-weight:bolder;
  text-decoration: none;
}

header a {
   text-decoration: none;
}

header span {
  font-size: 0.75em;
}

#nav {
  z-index: 999;
  width: 100%;
  border-top: thin solid #ffffff;
  padding: 1em;
  background-color: #740214;
  color: white;
  position: fixed;
  bottom: 0;
  font-family: 'Arial';
}

#nav a {
  font-size: 0.75em;
  text-decoration: none;
  color: rgb(201, 105, 105);
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
