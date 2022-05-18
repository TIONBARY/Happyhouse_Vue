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
