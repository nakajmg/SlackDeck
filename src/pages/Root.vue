<script>
import { mapState } from "vuex"
import Signin from "./Signin"
import Teams from "../containers/Teams.vue"
import Channels from "../containers/Channels.vue"
export default {
  name: "Root",
  computed: {
    ...mapState(["initialized"]),
  },
  render() {
    return (
      <div class="RootPage">
        <header class="RootPage_Header">
          {this.initialized ? <Teams /> : null} <Signin />
        </header>
        <main class="RootPage_Main">{this.initialized ? [<Channels />] : null}</main>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.RootPage {
  padding: 5px;
  display: grid;
  height: 100%;
  margin: 0;
  grid-template-rows: 50px 1fr;
  &_Header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    grid-row: 1;
  }
  &_Main {
    grid-row: 2;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>

<style>
html,
body {
  height: 100vh;
  margin: 0 auto;
  padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  height: 100%;
}
</style>
