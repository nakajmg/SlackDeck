import { first, toNumber } from "lodash"
import DateTime from "luxon/src/datetime"

export default ts => {
  const time = toNumber(first(ts.split("."))) * 1000
  return DateTime.fromMillis(time).toFormat("MM/dd HH:mm:ss")
}
