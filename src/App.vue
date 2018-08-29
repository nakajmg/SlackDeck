<script>
import types from "./store/types.js"
export default {
  name: "App",
  created() {
    this.$store.commit(types.RESTORE_FROM_LOCAL_STORAGE)
    // this.$store.commit(types.INITIALIZE_STATE)
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
