<template>
  <a
    class="CopyMessageLink"
    @click.prevent="copyMessageLink"
    :href="href"
  >
    <FontAwesomeIcon icon="link"/>
  </a>
</template>

<script>
import clipboard from "clipboard-polyfill"
import messageLink from "../utils/messageLink"
export default {
  name: "CopyMessageLink",
  props: {
    domain: String,
    channel: String,
    ts: String,
  },
  computed: {
    href() {
      const { domain, channel, ts } = this.$props
      return messageLink({ domain, channel, ts })
    },
  },
  methods: {
    copyMessageLink() {
      clipboard.writeText(this.href)
    },
  },
}
</script>

<style lang="scss">
.CopyMessageLink {
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
