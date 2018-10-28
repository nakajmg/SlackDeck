<script>
import { mapState } from "vuex"
import Team from "../components/Team.vue"
import { map } from "lodash"
import types from "../store/types"
export default {
  name: "Teams",
  computed: {
    ...mapState(["teams"]),
  },
  render(h) {
    return (
      <div class="Teams">
        {map(this.teams, (team, team_id) =>
          h(Team, {
            props: team,
            class: "Teams_Team",
            on: {
              [types.ADD_CHANNEL]: ({ channelId }) => {
                this[types.ADD_CHANNEL]({
                  channelId,
                  team_id,
                })
              },
            },
          }),
        )}
      </div>
    )
  },
  methods: {
    [types.ADD_CHANNEL]({ channelId, team_id }) {
      this.$store.commit(types.ADD_CHANNEL, {
        channelId,
        team_id,
      })
    },
  },
}
</script>

<style lang="scss">
.Teams {
  display: flex;
  flex-direction: column;
  &_Team + &_Team {
    margin-top: 5px;
  }
}
</style>
