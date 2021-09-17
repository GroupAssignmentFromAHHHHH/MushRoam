<template>
  <header></header>

  <div id="nav">
    <router-link :to="{ name: 'Home' }">WELCOME</router-link> /
    <router-link :to="{ name: 'PostList' }">Feed</router-link> /
    <router-link :to="{ name: 'PostCreate' }">New Post</router-link> /
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<style>
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
}

#nav {
  border-bottom:thin solid #ffffff;
  padding: 1.5em;
  background-color: #740214;
  color: white;
}

#nav a {
  font-size: 0.75em;
  text-decoration: none;
  color: rgb(134, 39, 39);
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
