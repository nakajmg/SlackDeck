<script>
import TeamInfo from "../components/Team/TeamInfo.vue"
import ChannelList from "../components/Team/ChannelList.vue"
import api from "../modules/api"
export default {
  name: "Team",
  props: {
    access_token: String,
    scope: String,
    team: Object,
    user: Object,
  },
  data() {
    return {
      channelList: [],
      teamInfo: {},
    }
  },
  render() {
    return (
      <div>
        <TeamInfo teamInfo={this.teamInfo} />
        <ChannelList channelList={this.channelList} onSelectChannel={this.onSelectChannel} />
        <button onClick={this.connect}>connect</button>
      </div>
    )
  },
  async created() {
    this.channelList = await api(this.access_token).channels.list()
    this.teamInfo = await api(this.access_token).team.info()
    // console.log(await api(this.access_token).users.list())
  },
  methods: {
    onSelectChannel({ id }) {
      console.log(id)
    },
    async connect() {
      const socket = await api(this.access_token).rtm.connect()
      socket.on("message", event => {
        console.log(JSON.parse(event.data))
      })
    },
  },
}
</script>
