<template>
  <a
    class="OpenOnSlack"
    @click.prevent="openOnSlack"
    :href="href"
    title="Open on Slack App"
  >
    <FontAwesomeIcon :icon="['fab', 'slack-hash']"/>
  </a>
</template>

<script>
import messageAppLink from "../utils/messageAppLink"
export default {
  name: "OpenOnSlack",
  props: {
    team: String,
    channel: String,
    ts: String,
  },
  computed: {
    href() {
      const { team, channel, ts } = this.$props
      return messageAppLink({
        team,
        channel,
        ts,
      })
    },
  },
  methods: {
    openOnSlack() {
      const iframe = document.createElement("iframe")
      iframe.src = this.href
      document.body.appendChild(iframe)
      setTimeout(function() {
        iframe.remove()
      }, 1e3)
    },
  },
}
</script>

<style lang="scss">
.OpenOnSlack {
  cursor: pointer;
  outline: none;
  &:link,
  &:visited {
    color: inherit;
  }
  &:hover {
    color: #0576b9;
  }
}
</style>
