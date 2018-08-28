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
      <div>
        {this.channels.map(({ channelId, team_id }) => {
          const { usersList, channelsList } = this.teams[team_id]
          const channelName = this.getChannelName({ channelId, channelsList })
          return h(Channel, {
            props: {
              team_id,
              channelId,
              channelName,
              usersList,
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
