<template>
  <div>
    <Navbar />

    <Nuxt />
  </div>
</template>
<script>
import Navbar from "../components/Navbar";

export default {
  components: { Navbar },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap");
body {
  background-color: #040f0f;
  color: whitesmoke;
  font-family: "Roboto Mono", monospace;
}
</style>
