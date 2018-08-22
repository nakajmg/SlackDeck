require("dotenv").config()
const axios = require("axios")
const queryString = require("query-string")
const url = "https://slack.com/api/oauth.access"
exports.handler = ({ queryStringParameters: query, headers }, context, callback) => {
  const code = query.code
  const appURL = query.state
  const redirectURI =
    process.env.NODE_ENV === "local"
      ? `http://${headers.host}/signinslack`
      : "https://festive-ride-32b5bd.netlify.com/.netlify/functions/signinslack"
  console.log(redirectURI)
  if (code) {
    return axios
      .get(url, {
        params: {
          code,
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          redirect_uri: redirectURI,
        },
      })
      .then(res => res.data)
      .then(json => {
        // const token = json.access_token
        return callback(null, {
          statusCode: 302,
          headers: {
            Location: `${appURL}?${queryString.stringify(json)}`,
          },
        })
      })
      .catch(err => {
        console.log(err)
        callback("500", err)
      })
  } else {
    return callback(null, {
      statusCode: 302,
      headers: {
        Location: `${appURL}?ok=false`,
      },
    })
  }
}
