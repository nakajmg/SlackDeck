import axios from "axios"
import extendScoket from "./extendSocket"
import qs from "query-string"
const ENTRY_POINT = strings => `https://slack.com/api${strings[0]}`

export default token => {
  const _get = (url, params = {}) => {
    return axios
      .get(url, {
        params: {
          token,
          ...params,
        },
      })
      .then(res => res.data)
  }
  // axios.defaults.headers.common['Access-Control-Request-Headers'] = null
  // axios.defaults.headers.common['Access-Control-Request-Method'] = null
  const _post = (url, data = {}) => {
    return axios({
      method: "POST",
      url,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      params: {
        token,
      },
      data: qs.stringify(data),
    })
  }

  return {
    team: {
      // https://api.slack.com/methods/team.info
      async info() {
        const url = ENTRY_POINT`/team.info`
        const res = await _get(url)
        return res.team
      },
    },
    channels: {
      // https://api.slack.com/methods/channels.list
      async list() {
        const url = ENTRY_POINT`/channels.list`
        const res = await _get(url, {
          exclude_archived: true,
          exclude_members: true,
        })
        return res.channels
      },
      async history({ channelId, count = 10 }) {
        const url = ENTRY_POINT`/channels.history`
        const res = await _get(url, {
          channel: channelId,
          count,
        })
        return res.messages
      },
    },
    users: {
      async list() {
        const url = ENTRY_POINT`/users.list`
        const res = await _get(url)
        return res.members
      },
    },
    rtm: {
      async connect() {
        const url = ENTRY_POINT`/rtm.connect`
        const res = await _get(url)
        console.log(res)
        const socket = new WebSocket(res.url)
        extendScoket(socket)
        return socket
      },
    },
    emoji: {
      async list() {
        const url = ENTRY_POINT`/emoji.list`
        const res = await _get(url)
        return res.emoji
      },
    },
    chat: {
      async postMessage({ channel, text }) {
        const url = ENTRY_POINT`/chat.postMessage`
        const res = await _post(url, { channel, text, as_user: true, link_names: true })
        console.log(res)
      },
    },
    reactions: {
      async add({ name, channel, timestamp }) {
        const url = ENTRY_POINT`/reactions.add`
        await _post(url, {
          name,
          channel,
          timestamp,
        })
      },
      async remove({ name, channel, timestamp }) {
        const url = ENTRY_POINT`/reactions.remove`
        await _post(url, {
          name,
          channel,
          timestamp,
        })
      },
    },
    bots: {
      async info(bot) {
        const url = ENTRY_POINT`/bots.info`
        const res = await _get(url, { bot })
        return res.bot
      },
    },
  }
}
