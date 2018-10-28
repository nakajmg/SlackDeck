<template>
  <div class="IconMenu">
    <span :class="[iconName]" class="IconMenu_Icon"></span>
    <span v-show="!collapse" class="IconMenu_Text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "IconMenu",
  props: {
    icon: String,
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      return `el-icon-${this.icon}`
    },
  },
}
</script>

<style lang="scss" scoped>
.IconMenu {
  display: inline-flex;
  align-items: center;
  &_Icon {
    display: inline-flex;
    width: 28px;
    height: 28px;
    font-size: 1.4em;
    align-items: center;
    justify-content: center;
  }
  &_Text {
    font-size: 1em;
  }
  &:hover {
    cursor: pointer;
    color: #0576b9;
  }
}
</style>
