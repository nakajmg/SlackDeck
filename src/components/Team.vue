<script>
import TeamInfo from "./Team/TeamInfo.vue"
import ChannelsList from "./Team/ChannelsList.vue"
import types from "../store/types"
export default {
  name: "Team",
  props: {
    team_id: String,
    access_token: String,
    channelsList: Array,
    usersList: Array,
    teamInfo: Object,
  },
  render() {
    return (
      <div class="Team">
        <TeamInfo teamInfo={this.teamInfo} class="Team_TeamInfo" />
        <ChannelsList channelsList={this.channelsList} onSelectChannel={this.onSelectChannel} />
      </div>
    )
  },
  methods: {
    onSelectChannel({ channelId }) {
      this.$store.commit(types.ADD_CHANNEL, {
        channelId,
        team_id: this.team_id,
      })
    },
  },
}
</script>

<style lang="scss">
.Team {
  margin-right: 5px;
  border: 1px solid #f0f0f0;
  padding: 5px;
  display: flex;
  align-items: center;
  &_TeamInfo {
    margin-right: 5px;
  }
}
</style>
