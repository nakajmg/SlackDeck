import Vue from "vue"
import { mapState } from "vuex"
export default Vue.extend({
  name: "Root",
  data() {
    return {
      redirectURI: "http://localhost:9000/slacksignin",
    }
  },
  computed: {
    ...mapState(["slackToken"]),
  },
  created() {
    if (this.slackToken) return
    this.$router.push({
      name: "signin",
    })
  },
  render(h) {
    return <div>signinした</div>
  },
})
