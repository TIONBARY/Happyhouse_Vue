<template>
  <div id="app">
    <navi-bar />
    <router-view />
  </div>
</template>

<script>
import NaviBar from "@/components/layout/HeaderNaviBar.vue";

export default {
  name: "App",
  components: {
    NaviBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
}

html,
body,
#app {
  height: 100%;
}

h3 {
  color: black !important;
}

a {
  text-decoration: none !important;
  color: rgb(40, 167, 69) !important;
}

a:hover {
  font-weight: bold;
}

a.router-link-exact-active {
  color: #3aa4ca;
}
</style>
