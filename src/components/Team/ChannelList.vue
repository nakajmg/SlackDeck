<template>
  <div>
    <ElSelect value="" @change="onChange">
      <ElOption v-for="channel in channelList" :key="channel.id" :value="channel.id" :label="channel.name"/>
    </ElSelect>
  </div>
</template>

<script>
export default {
  name: "ChannelList",
  props: {
    channelList: Array,
  },
  methods: {
    onChange(id) {
      this.$emit("selectChannel", { id })
    },
  },
}
</script>
