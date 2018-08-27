<template>
  <div v-if="teamInfo">
    <img :src="teamInfo.icon.image_68" v-if="teamInfo.icon">
    <span>
      {{teamInfo.name}}
    </span> 
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  props: {
    teamInfo: Object,
  },
}
</script>
