<script>
import types from "./store/types.js"
export default {
  name: "App",
  created() {
    this.$store.commit(types.RESTORE_FROM_LOCAL_STORAGE)
  },
  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>
