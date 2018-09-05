export default (userId, users) => {
  const user = users[userId]
  if (!user) return "https://a.slack-edge.com/0180/img/slackbot_72.png"
  const icon = user.profile.image_72
  return icon
}
