import Vue from "vue"
import { mapState } from "vuex"
import Signin from "./Signin"
export default Vue.extend({
  name: "Root",
  computed: {
    ...mapState(["slackToken"]),
  },
  render() {
    return <div>{this.slackToken ? <div>loginしてる</div> : <Signin />}</div>
  },
})
