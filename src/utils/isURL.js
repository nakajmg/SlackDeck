export default str => {
  return /https?:\/\/[^\s]+/.test(str)
}
