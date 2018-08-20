import Vue from "vue"
import queryString from "query-string"
const redirectURI =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:9000/signinslack"
    : "https://festive-ride-32b5bd.netlify.com/.netlify/functions/signinslack"
export default Vue.extend({
  name: "Signin",
  created() {
    const query = queryString.parse(location.search)
    if (query.ok === "true" && query.access_token) {
      console.log("ok")
      this.$store.commit("setSlackToken", query)
      this.$router.push({
        name: "root",
      })
    }
  },
  render(h) {
    return (
      <div>
        <a
          href={`https://slack.com/oauth/authorize?scope=identity.basic&client_id=2320436460.419427842645&redirect_uri=${redirectURI}&state=${
            location.href
          }`}
        >
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    )
  },
})
