export default ({ team, channel, ts }) => {
  const params = `team=${team}${channel ? "&id=" + channel : ""}${ts ? "&message=" + ts : ""}`
  return `slack:${channel ? "channel" : "open"}?${params}`
}
