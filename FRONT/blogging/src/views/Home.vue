<template>
<section> 

  <div><img class="biglogo" src="biglogo.png" alt=""></div>
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


.biglogo {
  height: 4em;
  width: 30em;
}

</style>
