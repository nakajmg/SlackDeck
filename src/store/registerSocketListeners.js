import types from "../store/types"
export default (socket, { state, team_id, commit, dispatch }) => {
  socket.on("message", ({ data: message }) => {
    if (!state.channels[message.channel]) return
    const mutation = message.thread_ts ? types.ADD_THREAD_MESSAGE : types.ADD_MESSAGE
    commit(`${message.channel}/${mutation}`, {
      message,
    })
    console.log("messageReceiqved", message)
    if (!state.notification) return
    dispatch(types.PUSH_NOTIFICATION, { team_id, message })
  })
  socket.on("message.message_changed", ({ data: message }) => {
    if (!state.channels[message.channel]) return
    commit(`${message.channel}/${types.UPDATE_MESSAGE}`, { message })
  })
  socket.on("message.message_deleted", ({ data: message }) => {
    if (!state.channels[message.channel]) return
    commit(`${message.channel}/${types.DELETE_MESSAGE}`, { message })
  })

  socket.on("message.message_replied", ({ data: message }) => {
    if (!state.channels[message.channel]) return
    console.log("replied", message)
    commit(`${message.channel}/${types.REPLIED_MESSAGE}`, { message })
  })
  socket.on("reaction_added", ({ data: message }) => {
    if (!state.channels[message.item.channel]) return
    console.log("reaction", message)
    commit(`${message.item.channel}/${types.ADD_REACTION}`, { message })
  })
  socket.on("reaction_removed", ({ data: message }) => {
    if (!state.channels[message.item.channel]) return
    console.log("reaction remove", message)
    commit(`${message.item.channel}/${types.REMOVE_REACTION}`, { message })
  })

  socket.on("user_change", ({ data: message }) => {
    // ユーザのステータスが変わったときのしょりを書く。userオブジェクトが飛んでくるからそのまま差し替えればよさそう
    console.log("user change", message)
  })
  return socket
}
