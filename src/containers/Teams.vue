<script>
import { mapState } from "vuex"
import Team from "../components/Team.vue"
import { map } from "lodash"
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
            props: { ...team, team_id },
          }),
        )}
      </div>
    )
  },
}
</script>

<style lang="scss">
.Teams {
  display: flex;
}
</style>
