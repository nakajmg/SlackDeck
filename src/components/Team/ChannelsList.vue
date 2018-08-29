<template>
  <div class="ChannelsList">
    <ElSelect v-model="selectedChannel" filterable @change="select">
      <ElOption v-for="channel in channelsList" :key="channel.id" :value="channel.id" :label="channel.name"/>
    </ElSelect>
  </div>
</template>

<script>
export default {
  name: "ChannelsList",
  props: {
    channelsList: Array,
  },
  data() {
    return {
      selectedChannel: "",
    }
  },
  methods: {
    select(channelId) {
      this.$emit("selectChannel", { channelId })
      this.selectedChannel = ""
    },
  },
}
</script>

<style lang="scss">
.ChannelsList {
  &_AddButton {
    margin-left: 5px;
  }
}
</style>
