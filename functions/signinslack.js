const dotenv = require("dotenv").config()
const env = dotenv.error ? null : dotenv.parsed
const axios = require("axios")
const queryString = require("query-string")
const url = "https://slack.com/api/oauth.access"
exports.handler = ({ queryStringParameters: query, headers, path }, context, callback) => {
  console.log(process.env)
  const code = query.code
  const appURL = query.state
  const redirectURI = `http://${headers.host}/signinslack`
  const client_id = env ? env.SLACK_CLIENT_ID : SLACK_CLIENT_ID
  const client_secret = env ? env.SLACK_CLIENT_SECRET : SLACK_CLIENT_SECRET
  if (code) {
    return axios
      .get(url, {
        params: {
          code,
          client_id,
          client_secret,
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
