<script>
import { mapState } from "vuex"
import Channel from "../components/Channel.vue"
import { find, findIndex } from "lodash"
import types from "../store/types"
import events from "../variables/events"
export default {
  name: "Channels",
  computed: {
    ...mapState(["channelsOrder", "teams", "channels", "tokens"]),
  },
  render(h) {
    return (
      <div class="Channels">
        {this.channelsOrder.map(({ channelId, team_id }) => {
          const { channelsList, teamInfo, emojiList } = this.teams[team_id]
          const channelName = this.getChannelName({ channelId, channelsList })
          const token = this.tokens.find(token => token.team_id === team_id)
          const user_id = token.user_id
          const customEmojis = this.$store.getters[`${team_id}/customEmojis`]
          return h(Channel, {
            class: "Channels_Channel",
            key: channelId,
            props: {
              user_id,
              teamInfo,
              channelId,
              channelName,
              users: this.$store.getters[`${team_id}/users`],
              channel: this.channels[channelId],
              emojiList,
              customEmojis,
              disableMoveLeft: !this.canMoveLeft({ channelId, team_id }),
              disableMoveRight: !this.canMoveRight({ channelId, team_id }),
            },
            on: {
              remove: this.removeChannel,
              moveLeft: this.moveLeftChannel,
              moveRight: this.moveRightChannel,
              [types.REACTION_TO_MESSAGE]: this.reactionToMessage,
              [events.CLICK_REACTION]: this.reactionToMessage,
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
    reactionToMessage({ channelId, ts, name, reacted }) {
      const type = reacted ? types.REACTION_TO_REMOVE : types.REACTION_TO_MESSAGE
      this.$store.dispatch(`${channelId}/${type}`, {
        ts,
        name,
        channelId,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.Channels {
  display: flex;
  height: 100%;
  overflow-x: auto;
}
</style>
