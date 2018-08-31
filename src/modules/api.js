import axios from "axios"
import handleSocket from "./handleSocket"
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
      async history({ channelId, count = 5 }) {
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
        handleSocket(socket)
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
  }
}
