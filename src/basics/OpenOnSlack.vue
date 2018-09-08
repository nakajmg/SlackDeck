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
      const params = `team=${team}${channel ? "&id=" + channel : ""}${ts ? "&message=" + ts : ""}`
      return `slack:${channel ? "channel" : "open"}?${params}`
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
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  opacity: 0.5;
  &:link {
    color: inherit;
  }
  &:hover {
    color: #0576b9;
    opacity: 1;
  }
}
</style>
