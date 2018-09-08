export default ({ user, bot_id }, users) => {
  const _user = users[user] || users[bot_id]
  if (!_user) return "Bot"
  if (_user && _user.name) return bot_id ? _user.real_name : _user.name
  return user
}
