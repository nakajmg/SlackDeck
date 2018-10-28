<template>
  <div class="ChannelsList">
    <ElSelect placeholder="Select channel" v-model="selectedChannel" filterable @change="select" size="mini" background-color="#000" ref="select">
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
    openChannelSelect() {
      this.$refs.select.$el.click()
    },
  },
}
</script>

<style lang="scss" scoped>
.ChannelsList {
  &_AddButton {
    margin-left: 5px;
  }
  /deep/ .el-input__inner {
    color: #e1e8ed;
    background-color: #10171e;
    border: none;
  }
}
</style>

