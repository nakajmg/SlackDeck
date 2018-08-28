<script>
import TeamInfo from "./Team/TeamInfo.vue"
import ChannelsList from "./Team/ChannelsList.vue"
import api from "../modules/api"
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
      <div>
        <TeamInfo teamInfo={this.teamInfo} />
        <ChannelsList channelsList={this.channelsList} onSelectChannel={this.onSelectChannel} />
      </div>
    )
  },
  mounted() {
    return this.connect()
  },
  methods: {
    onSelectChannel({ channelId }) {
      this.$store.commit(types.ADD_CHANNEL, {
        channelId,
        team_id: this.team_id,
      })
    },
    async connect() {
      const socket = await api(this.access_token).rtm.connect()
      socket.on("message", event => {
        this.$emit("messageReceived", JSON.parse(event.data))
      })
      socket.on("reaction_added", event => {
        console.log(JSON.parse(event.data))
      })
      socket.on("message.message_changed", event => {
        console.log(JSON.parse(event.data))
      })
    },
  },
}
</script>
