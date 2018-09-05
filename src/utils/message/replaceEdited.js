export default (text, edited) => {
  text += edited ? "<span class='Message_Edited'>(edited)</span>" : ""
  return text
}
