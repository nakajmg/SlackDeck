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
          const data = JSON.parse(event.data)
          console.log(event.type, data.type)
          const handler = data.subtype
            ? socket.eventList[`${data.type}.${data.subtype}`]
            : null || socket.eventList[data.type] || socket.eventList[event.type]
          if (!isFunction(handler)) return
          if (event.type === "message") {
            switch (data.type) {
              case "message":
                return handler(event)
              case "reaction_added":
                return handler(event)
              case "reaction_removed":
                return handler(event)
              default:
                return
            }
          }
          switch (event.type) {
            default:
              return handler(event)
          }
        })
        return socket
      },
    },
  }
}
