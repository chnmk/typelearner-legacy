<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
</script>

<template>
  <header>
    <div>
      <MainHeader/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto Sans");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans JP");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans Hebrew");

* {
    font-family:
        "Noto Sans",
        "Noto Sans JP",
        "Noto Sans Hebrew",
        sans-serif;
    color: #2c3e50;
    padding: 2px;
    margin: 10px;
}

header { /*<MainHeader />*/
	text-align: center;
}

@media screen and (min-width: 800px) {
  main { /*<RouterView />*/
    font-size: 14px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border: 2px solid purple;
    max-width: 1464px;
    margin: auto;
  }
}

@media screen and (max-width: 799px) {
main { /*<RouterView />*/
  font-size: 14px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 2px solid purple;
  max-width: 1464px;
  margin: auto;
  text-align: center;
  }
}
</style>
