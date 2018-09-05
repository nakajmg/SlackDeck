export default ({ user, bot_id }, users) => {
  const _user = users[user]
  if (_user.name) return bot_id ? _user.real_name : _user.name
  return user
}
