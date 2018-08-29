<template>
  <div class="ChannelsList">
    <ElSelect v-model="selectedChannel" filterable>
      <ElOption v-for="channel in channelsList" :key="channel.id" :value="channel.id" :label="channel.name"/>
    </ElSelect>
    <ElButton class="ChannelsList_AddButton" type="primary" icon="el-icon-plus" @click="select" :disabled="!selectedChannel"></ElButton>
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
    select() {
      const channelId = this.selectedChannel
      if (channelId === "") return
      this.$emit("selectChannel", { channelId })
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
