<script>
import { mapState } from "vuex"
import Team from "../components/Team.vue"
import map from "lodash/map"
import types from "../store/types"
export default {
  name: "Teams",
  computed: {
    ...mapState(["teams", "messages"]),
  },
  render(h) {
    return (
      <div>
        {map(this.teams, (team, team_id) =>
          h(Team, {
            props: { ...team, team_id },
            on: {
              messageReceived: this.onMessage,
            },
          }),
        )}
      </div>
    )
  },
  methods: {
    onMessage(message) {
      const channelId = message.channel
      if (!this.messages[channelId]) return
      this.$store.commit(types.ADD_MESSAGE, {
        channelId,
        message,
      })
      console.log(message)
    },
  },
}
</script>
