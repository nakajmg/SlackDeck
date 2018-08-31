export default async ({ title, body, icon, tag = "", data = {} }) => {
  console.log(title, body, icon, tag, data)
  const permission = await Notification.requestPermission()
  if (permission !== "granted") return
  const n = new Notification(title, {
    body,
    icon,
    tag,
    data,
  })
  setTimeout(() => {
    n.close()
  }, 4000)
}
