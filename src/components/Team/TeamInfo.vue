<template>
  <div v-if="teamInfo" class="TeamInfo">
    <img :src="teamInfo.icon.image_68" v-if="teamInfo.icon"  class="TeamInfo_Icon">
    <span class="TeamInfo_Name">
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

<style lang="scss" scoped>
.TeamInfo {
  display: flex;
  align-items: center;
  &_Icon {
    height: 32px;
    width: auto;
    display: block;
    border-radius: 3px;
  }
  &_Name {
    margin-left: 5px;
    font-size: 18px;
    display: none;
  }
}
</style>
