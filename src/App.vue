<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import types from "./store/types.js"
export default {
  name: "App",
  created() {
    this.$store.commit(types.RESTORE_FROM_LOCAL_STORAGE)
  },
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
