export default text => {
  text = text.replace(/&gt;(.*)$/g, (match, $1) => {
    return `<blockquote class="Message_Blockquote">${$1}</blockquote>`
  })
  return text
}
