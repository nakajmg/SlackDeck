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
          is_org_shared: true,
        })
        return res.channels
      },
      // https://api.slack.com/methods/channels.history
      async history({ channelId, count = 5 }) {
        const url = ENTRY_POINT`/channels.history`
        const res = await _get(url, {
          channel: channelId,
          count,
        })
        return res.messages
      },
      // https://api.slack.com/methods/channels.info
      async info({ channelId }) {
        const url = ENTRY_POINT`/channels.info`
        const res = await _get(url, {
          channel: channelId,
        })
        return res.channel
      },
    },
    users: {
      // https://api.slack.com/methods/users.list
      async list() {
        const url = ENTRY_POINT`/users.list`
        const res = await _get(url)
        return res.members
      },
    },
    rtm: {
      // https://api.slack.com/methods/rtm.connect
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
      // https://api.slack.com/methods/emoji.list
      async list() {
        const url = ENTRY_POINT`/emoji.list`
        const res = await _get(url)
        return res.emoji
      },
    },
    chat: {
      // https://api.slack.com/methods/chat.postMessage
      async postMessage({ channel, text, thread_ts }) {
        const url = ENTRY_POINT`/chat.postMessage`
        const res = await _post(url, { channel, text, thread_ts, as_user: true, link_names: true })
        console.log(res)
      },
    },
    reactions: {
      // https://api.slack.com/methods/reactions.add
      async add({ name, channel, timestamp }) {
        const url = ENTRY_POINT`/reactions.add`
        await _post(url, {
          name,
          channel,
          timestamp,
        })
      },
      // https://api.slack.com/methods/reactions.remove
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
      // https://api.slack.com/methods/bots.info
      async info(bot) {
        const url = ENTRY_POINT`/bots.info`
        const res = await _get(url, { bot })
        return res.bot
      },
    },
  }
}
