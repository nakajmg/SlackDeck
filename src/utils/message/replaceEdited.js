export default (text = "", edited = false) => {
  text += edited ? "<span class='Message_Edited'>(edited)</span>" : ""
  return text
}
