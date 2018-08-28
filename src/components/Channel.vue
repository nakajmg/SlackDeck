<template>
  <div>
    <h3>{{channelName}}</h3>
    <div>
      <div v-for="message in messages.messages" :key="message.client_msg_id">
        {{timestamp(message.ts)}}/{{userName(message.user)}}/{{message.text}}
      </div>
    </div>
  </div>
</template>

<script>
import find from "lodash/find"
import first from "lodash/first"
import toNumber from "lodash/toNumber"
import DateTime from "luxon/src/datetime"
export default {
  name: "Channel",
  props: {
    team_id: String,
    channelId: String,
    channelName: String,
    usersList: Array,
    messages: Object,
  },
  methods: {
    userName(userId) {
      const user = find(this.usersList, ({ id }) => id === userId)
      return user.name
      // return user.reak_name
    },
    timestamp(ts) {
      const time = toNumber(first(ts.split("."))) * 1000
      return DateTime.fromMillis(time).toFormat("yyyy/MM/dd HH:mm:ss")
    },
  },
  // computed: {
  //   channelMessages() {
  //     return this.messages[this.channelId]
  //   },
  // },
}
</script>
