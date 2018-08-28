<template>
  <div>
    <ElSelect v-model="selectedChannel">
      <ElOption v-for="channel in channelsList" :key="channel.id" :value="channel.id" :label="channel.name"/>
    </ElSelect>
    <ElButton type="primary" icon="el-icon-plus" @click="select"></ElButton>
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
      this.$emit("selectChannel", { channelId })
    },
  },
}
</script>
