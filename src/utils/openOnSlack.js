export default ({ team, channel, ts }) => {
  const iframe = document.createElement("iframe")
  const params = `team=${team}${channel ? "&id=" + channel : ""}${ts ? "&message=" + ts : ""}`
  const url = `slack:${channel ? "channel" : "open"}?${params}`
  iframe.src = url
  document.body.appendChild(iframe)
  setTimeout(function() {
    iframe.remove()
  }, 1e3)
}
