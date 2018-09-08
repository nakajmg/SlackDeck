export default (text = "", users) => {
  text = text.replace(/<@(U\S*)>/g, (match, $1) => {
    const user = users[$1]
    return `<span data-user="${$1}">@${user.name}</span>`
  })
  return text
}
