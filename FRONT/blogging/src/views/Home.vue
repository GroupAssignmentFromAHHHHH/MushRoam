<template>
<section> 

  <h2>Welcome to Mushroam</h2>
  <p>{{ user }}</p>
 
 </section>
</template>

<script>


export default {
  name: 'Home',
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
  background-color:#810013;
  color: white;
}

/* section:hover {
  background-color:#a7404f;
  width:70vw;
  height:31vh;
  border-radius: 20em;
} */

</style>
