<template>
  <div class="FileMenu">
    <div class="FileMenu_Wrapper">
      <el-dropdown trigger="click">
        <span class="el-icon-more">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in menu" :key="item.label">
            <span v-if="item.handler" @click.prevent="item.handler">
              {{item.label}}
            </span>
            <a v-else-if="item.href" :href="item.href" :target="item.target">
              {{item.label}}
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileMenu",
  props: {
    menu: Array,
  },
}
</script>

<style lang="scss">
.FileMenu {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  &_Wrapper {
    background-color: #fff;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
  }
}
.el-dropdown-menu__item {
  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>
