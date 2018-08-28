import Vue from "vue"
import { mapState } from "vuex"
import Signin from "./Signin"
import Teams from "../containers/Teams.vue"
import Channels from "../containers/Channels.vue"
import api from "../modules/api"
import types from "../store/types"
export default Vue.extend({
  name: "Root",
  computed: {
    ...mapState(["tokens", "teams"]),
  },
  data() {
    return {
      initialized: false,
    }
  },
  render() {
    return (
      <div>
        <header>
          <Signin />
        </header>
        <main>{this.initialized ? [<Teams />, <Channels />] : null}</main>
      </div>
    )
  },
  async created() {
    await Promise.all(
      this.tokens.map(async ({ access_token }) => {
        const [channelsList, teamInfo, usersList] = await Promise.all([
          api(access_token).channels.list(),
          api(access_token).team.info(),
          api(access_token).users.list(),
        ])
        this.$store.commit(types.SET_TEAM_INFO, {
          access_token,
          channelsList,
          teamInfo,
          usersList,
        })
      }),
    )
    this
    this.initialized = true
  },
})
