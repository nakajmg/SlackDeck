export default ({ user, bot_id }, users) => {
  if (bot_id) return user || "Bot"
  const _user = users[user] || {}
  return _user.name || "unknown"
}
