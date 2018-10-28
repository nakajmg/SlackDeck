export default (text = "") => {
  return text.replace(/<!(channel|here)>/, (match, $1) => `<span data-user="$1">@${$1}</span>`)
}
