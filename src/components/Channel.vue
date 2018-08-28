<template>
  <div>{{channelName}}</div>
</template>

<script>
export default {
  name: "Channel",
  props: {
    team_id: String,
    channelId: String,
    messages: Array,
    channelName: String,
  },
}
</script>
