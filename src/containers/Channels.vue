<script>
import { mapState } from "vuex"
import Channel from "../components/Channel.vue"
import find from "lodash/find"
export default {
  name: "Channels",
  computed: {
    ...mapState(["channels", "teams", "messages"]),
    _channels() {
      return this.channels.map(({ channelId, team_id }) => {
        const { teamInfo, usersList, channelsList } = this.teams[team_id]
        const channelName = this.getChannelName({ channelId, channelsList })
        return {
          channelName,
          team_id,
          channelId,
          messages: this.messages[channelId],
        }
      })
    },
  },
  render(h) {
    return (
      <div>
        {this._channels.map(channel => {
          return h(Channel, { props: channel })
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
