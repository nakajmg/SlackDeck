import Vue from "vue"
import { mapState } from "vuex"
import Signin from "./Signin"
import Team from "../containers/Team.vue"
export default Vue.extend({
  name: "Root",
  computed: {
    ...mapState(["slackToken", "teams"]),
  },
  render(h) {
    return (
      <div>
        <header>
          <Signin />
        </header>
        <main>{this.teams.map(team => h(Team, { props: team }))}</main>
      </div>
    )
  },
})
