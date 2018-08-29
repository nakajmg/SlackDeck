<script>
import { mapState } from "vuex"
import Channel from "../components/Channel.vue"
import find from "lodash/find"
import findIndex from "lodash/findIndex"
import types from "../store/types"
export default {
  name: "Channels",
  computed: {
    ...mapState(["channels", "teams", "messages"]),
  },
  render(h) {
    return (
      <div class="Channels">
        {this.channels.map(({ channelId, team_id }) => {
          const { channelsList, teamInfo, emojiList } = this.teams[team_id]
          const channelName = this.getChannelName({ channelId, channelsList })

          return h(Channel, {
            class: "Channels_Channel",
            props: {
              teamInfo,
              channelId,
              channelName,
              users: this.$store.getters[`${team_id}/users`],
              messages: this.messages[channelId],
              emojiList,
            },
            on: {
              removeChannel: this.removeChannel,
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
      const index = findIndex(this.channels, channel => {
        return channel.channelId === channelId && channel.team_id === team_id
      })
      console.log(this.channels)
      console.log(channelId, team_id)
      console.log(index)
      if (index === -1) return
      this.$store.commit(types.REMOVE_CHANNEL, { channelId, team_id })
    },
  },
}
</script>
<style lang="scss" scoped>
.Channels {
  display: flex;
}
</style>
