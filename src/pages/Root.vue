<script>
import { mapState } from "vuex"
import Channels from "../containers/Channels.vue"
import Sidebar from "../containers/Sidebar.vue"
export default {
  name: "Root",
  computed: {
    ...mapState(["initialized"]),
  },
  render() {
    return (
      <div class="RootPage">
        <Sidebar class="RootPage_Sidebar" />
        <main class="RootPage_Main">{this.initialized ? [<Channels />] : null}</main>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.RootPage {
  display: grid;
  height: 100%;
  margin: 0;
  grid-template-rows: 1fr;
  grid-template-columns: 42px 1fr;
  &_Sidebar {
    grid-row: 1;
    grid-column: 1;
  }
  &_Main {
    grid-row: 1;
    grid-column: 2;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>

<style>
html,
body {
  overflow: hidden;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
  /* background-color: #f7fbfd; */
  background-color: #10171e;
}
* {
  box-sizing: border-box;
}
#app {
  height: 100%;
}
</style>
