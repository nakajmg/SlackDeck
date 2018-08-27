import axios from "axios"
import isFunction from "lodash/isFunction"
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
        socket.eventList = {}
        socket.on = (eventName, callback) => {
          socket.eventList[eventName] = callback
        }
        socket.addEventListener("message", event => {
          if (event.data === '{"type": "hello"}') return
          if (!isFunction(socket.eventList[event.type])) return
          switch (event.type) {
            case "message":
              if (JSON.parse(event.data).type !== "message") return
              return socket.eventList[event.type](event)
            default:
              return socket.eventList[event.type](event)
          }
        })
        return socket
      },
    },
  }
}
