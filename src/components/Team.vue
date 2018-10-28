<script>
import TeamInfo from "./Team/TeamInfo.vue"
import ChannelsList from "./Team/ChannelsList.vue"
import types from "../store/types"
export default {
  name: "Team",
  props: {
    access_token: String,
    channelsList: Array,
    usersList: Array,
    teamInfo: Object,
    collapse: Boolean,
  },
  render() {
    return (
      <div class="Team">
        <TeamInfo teamInfo={this.teamInfo} class="Team_TeamInfo" onClick={this.openChannelSelect} />
        <ChannelsList
          channelsList={this.channelsList}
          onSelectChannel={this.onSelectChannel}
          collapse={this.collapse}
          ref="channellist"
        />
      </div>
    )
  },
  methods: {
    onSelectChannel({ channelId }) {
      this.$emit(types.ADD_CHANNEL, {
        channelId,
      })
    },
    openChannelSelect() {
      this.$refs.channellist.openChannelSelect()
    },
  },
}
</script>

<style lang="scss">
.Team {
  // margin-right: 5px;
  // border: 1px solid #f0f0f0;
  // padding: 5px;
  display: flex;
  align-items: center;
  &_TeamInfo {
    margin-right: 5px;
  }
}
</style>
