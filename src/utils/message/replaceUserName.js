export default (text = "", users) => {
  text = text.replace(/<@U\S*>/g, match => {
    const matched = match.match(/@(U[A-Z0-9]*)/)
    const user = users[matched[1]]
    if (!user) {
      return "unknown user"
    }
    return `<span data-user="${matched[1]}">@${user.name}</span>`
  })
  return text
}
