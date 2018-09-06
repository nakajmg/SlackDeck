<script>
import { mapState } from "vuex"
import Channel from "../components/Channel.vue"
import { find, findIndex } from "lodash"
import types from "../store/types"
export default {
  name: "Channels",
  computed: {
    ...mapState(["channelsOrder", "teams", "channels"]),
  },
  render(h) {
    return (
      <div class="Channels">
        {this.channelsOrder.map(({ channelId, team_id }) => {
          const { channelsList, teamInfo, emojiList } = this.teams[team_id]
          const channelName = this.getChannelName({ channelId, channelsList })

          return h(Channel, {
            class: "Channels_Channel",
            key: channelId,
            props: {
              teamInfo,
              channelId,
              channelName,
              users: this.$store.getters[`${team_id}/users`],
              channel: this.channels[channelId],
              emojiList,
              disableMoveLeft: !this.canMoveLeft({ channelId, team_id }),
              disableMoveRight: !this.canMoveRight({ channelId, team_id }),
            },
            on: {
              remove: this.removeChannel,
              moveLeft: this.moveLeftChannel,
              moveRight: this.moveRightChannel,
            },
          })
        })}
      </div>
    )
  },
  methods: {
    getChannelName({ channelsList, channelId }) {
      const channel = find(channelsList, channel => channel.id === channelId)
      return channel.name
    },
    removeChannel({ channelId, team_id }) {
      const index = findIndex(
        this.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      if (index === -1) return
      this.$store.commit(types.REMOVE_CHANNEL, { channelId, team_id })
    },
    moveLeftChannel({ channelId, team_id }) {
      if (!this.canMoveLeft({ channelId, team_id })) return
      this.$store.commit(types.MOVE_LEFT_CHANNEL, { channelId, team_id })
    },
    moveRightChannel({ channelId, team_id }) {
      if (!this.canMoveRight({ channelId, team_id })) return
      this.$store.commit(types.MOVE_RIGHT_CHANNEL, { channelId, team_id })
    },
    canMoveRight({ channelId, team_id }) {
      const index = findIndex(
        this.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      return index !== -1 && index !== this.channelsOrder.length - 1
    },
    canMoveLeft({ channelId, team_id }) {
      const index = findIndex(
        this.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      return index !== -1 && index !== 0
    },
  },
}
</script>
<style lang="scss" scoped>
.Channels {
  display: flex;
}
</style>
