import queryString from "query-string"
import types from "../store/types"
export default {
  name: "Signin",
  computed: {
    redirectURI() {
      return process.env.NODE_ENV === "local"
        ? "http://localhost:9000/signinslack"
        : "https://festive-ride-32b5bd.netlify.com/.netlify/functions/signinslack"
    },
  },
  created() {
    const query = queryString.parse(location.search)
    if (!query.response) return
    const response = JSON.parse(query.response)
    if (!response.ok) return
    // teamの重複チェック？
    // tokenの更新の可能性があるから重複チェックしていい感じにする
    this.$store.commit(types.ADD_TOKEN, response)
    this.$router.replace({
      name: this.$route.name,
    })
  },
  render() {
    return (
      <div>
        <a
          href={`https://slack.com/oauth/authorize?scope=client&client_id=2320436460.419427842645&redirect_uri=${
            this.redirectURI
          }&state=${location.href}`}
        >
          <img
            alt="Sign in with Slack"
            height="auto"
            width="100%"
            style="display: block;"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    )
  },
}
