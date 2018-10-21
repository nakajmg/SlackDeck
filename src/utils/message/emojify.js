import { emojify } from "node-emoji"
import isURL from "../isURL"
export default (name, emojiList) => {
  const _emoji = emojify(`${name}`, name => {
    return emojiList[name]
  })
  const emoji = {
    name,
  }
  isURL(_emoji) ? (emoji.src = _emoji) : (emoji.emoji = _emoji)
  return emoji
}
