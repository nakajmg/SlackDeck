<script>
import queryString from "query-string"
import types from "../store/types"
import IconMenu from "./IconMenu.vue"
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
      <div class="Signin">
        <el-tooltip content="Add Team">
          <a
            class="Signin_Button"
            href={`https://slack.com/oauth/authorize?scope=client&client_id=2320436460.419427842645&redirect_uri=${
              this.redirectURI
            }&state=${location.href}`}
          >
            <IconMenu icon="plus">Add team</IconMenu>
          </a>
        </el-tooltip>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.Signin {
  width: 100%;
  &_Button {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    padding: 2px;
    &:before {
      // content: "";
      background-image: url(https://platform.slack-edge.com/img/sign_in_with_slack@2x.png);
      background-size: auto 40px;
      background-position: -6px;
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
    &:hover {
      color: #0576b9;
    }
  }
}
</style>
