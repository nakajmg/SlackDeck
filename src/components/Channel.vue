<template>
  <div>
    <h3>{{channelName}}</h3>
    <div>
      <Message v-for="message in messages.messages" :key="message.ts" v-bind="message" :users="users" />
    </div>
  </div>
</template>

<script>
import find from "lodash/find"
import first from "lodash/first"
import toNumber from "lodash/toNumber"
import DateTime from "luxon/src/datetime"
import Message from "./Message.vue"
export default {
  name: "Channel",
  props: {
    team_id: String,
    channelId: String,
    channelName: String,
    users: Object,
    messages: Object,
  },
  components: {
    Message,
  },
}
</script>
