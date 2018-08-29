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
      <div style="padding: 5px;">
        <header style="display: flex; align-items: flex-end; margin-bottom: 5px;">
          {this.initialized ? <Teams /> : null} <Signin />
        </header>
        <main>{this.initialized ? [<Channels />] : null}</main>
      </div>
    )
  },
}
