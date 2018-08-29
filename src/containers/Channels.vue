<script>
import { mapState } from "vuex"
import Channel from "../components/Channel.vue"
import find from "lodash/find"
export default {
  name: "Channels",
  computed: {
    ...mapState(["channels", "teams", "messages"]),
  },
  render(h) {
    return (
      <div class="Channels">
        {this.channels.map(({ channelId, team_id }) => {
          const { usersList, channelsList } = this.teams[team_id]
          const channelName = this.getChannelName({ channelId, channelsList })
          return h(Channel, {
            class: "Channels_Channel",
            props: {
              team_id,
              channelId,
              channelName,
              users: this.$store.getters[`${team_id}/users`],
              messages: this.messages[channelId],
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
  },
}
</script>
<style lang="scss" scoped>
.Channels {
  display: flex;
  &_Channel {
    display: block;
    min-width: 300px;
    flex-grow: 1;
  }
}
</style>
