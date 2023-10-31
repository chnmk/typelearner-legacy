<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="typelearner template"/>
  <!--REMOVE ME-->
</template>

<script>
import HelloWorld from './components/HelloTypelearner.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto Sans");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans JP");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans Hebrew");

* {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    margin: 15px;
    font-family: 
      "Noto Sans", 
      "Noto Sans JP", 
      "Noto Sans Hebrew", 
      sans-serif;
    font-size: 14px;
  }

.correct-text{
  color: green
}

.wrong-text{
  color: red
}
</style>
