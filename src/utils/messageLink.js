export default ({ domain, channel, ts }) => {
  return `https://${domain}.slack.com/archives/${channel}/p${ts.replace(/\./g, "")}`
}
