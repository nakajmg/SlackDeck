import { emojify } from "node-emoji"
import isURL from "../isURL"
export default (reactions, emojiList) => {
  const emojis = reactions.map(({ name, count, users }) => {
    const emoji = emojify(`:${name}:`, name => {
      return emojiList[name]
    })
    const reaction = {
      name,
      count,
      users,
    }
    isURL(emoji) ? (reaction.src = emoji) : (reaction.emoji = emoji)
    return reaction
  })
  return emojis
}
