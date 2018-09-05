export default text => {
  text = text.replace(/<(https?:\/\/[^\s]+)\|(.*?)>/g, (url, $1, $2) => {
    return `<a href="${$1}" target="_blank" rel="noopener">${$2}</a>`
  })
  text = text.replace(/<(https?:\/\/[^\s]+)>/g, (url, $1) => {
    return `<a href="${$1}" target="_blank" rel="noopener">${$1}</a>`
  })
  return text
}
