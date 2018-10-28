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
  },
  render() {
    return (
      <div class="Team">
        <el-popover
          trigger="click"
          placement="right"
          popper-class="Team_Popover"
          popper-append-to-body={false}
        >
          <div>
            <div class="Team_Name">
              <img src={this.teamInfo.icon.image_68} class="Team_Icon" />
              {this.teamInfo.name}
            </div>
            <ChannelsList
              class="Team_ChannelsList"
              channelsList={this.channelsList}
              onSelectChannel={this.onSelectChannel}
            />
          </div>
          <el-button slot="reference" type="text" class="Team_OpenButton">
            <TeamInfo teamInfo={this.teamInfo} class="Team_TeamInfo" />
          </el-button>
        </el-popover>
      </div>
    )
  },
  methods: {
    onSelectChannel({ channelId }) {
      this.$emit(types.ADD_CHANNEL, {
        channelId,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Team {
  position: relative;
  display: flex;
  align-items: center;
  &_OpenButton {
    padding: 0;
  }
  &_Popover {
    padding: 3px;
  }
  &_Icon {
    height: 25px;
    width: 25px;
    border-radius: 3px;
    margin-right: 5px;
  }
  &_Name {
    font-weight: 600;
    font-size: 0.9em;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="scss">
.Team {
  &_Popover {
    padding: 5px;
  }
}
</style>
