import { emojify } from "node-emoji"
export default (text = "", emojiList) => {
  return emojify(
    text,
    name => {
      const emoji = emojiList[name]
      return emoji ? `<img data-custom-emoji="${name}" src="${emoji}">` : name
    },
    (code, name) => {
      return `<span data-emoji="${name}">${code}</span>`
    },
  )
}
