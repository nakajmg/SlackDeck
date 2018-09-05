import isFunction from "lodash/isFunction"
export default function handleSocket(socket) {
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
        case "message_changed":
          return handler(event)
        case "message_replied":
          return handler(event)
        case "message_deleted":
          return handler(event)
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
}
