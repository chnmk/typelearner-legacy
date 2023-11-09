<template>
  <TypeLearner/>
</template>

<script>
import TypeLearner from './components/typelearner.vue'
export default {
  name: 'App',
  components: {
    TypeLearner
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto Sans");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans JP");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans Hebrew");

* {
  font-family:
      "Noto Sans",
      "Noto Sans JP",
      "Noto Sans Hebrew",
      sans-serif;
  }
</style>
