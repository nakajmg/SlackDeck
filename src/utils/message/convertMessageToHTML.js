import replaceLink from "./replaceLink"
import replaceUserName from "./replaceUserName"
import replaceEmoji from "./replaceEmoji"
import replaceBlockquote from "./replaceBlockquote"
import replaceEdited from "./replaceEdited"
export default ({ text = "", edited = false }, { users, emojiList }) => {
  text = replaceUserName(text, users)
  text = replaceEmoji(text, emojiList)
  text = replaceLink(text)
  text = replaceBlockquote(text)
  text = replaceEdited(text, edited)
  return text
}
