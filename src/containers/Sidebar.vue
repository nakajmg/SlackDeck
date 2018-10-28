<template>
  <header class="Sidebar" :class="{_collapse: ui.sidebarCollapse}">
    <Teams class="Sidebar_Teams" v-if="initialized" />
    <div class="Sidebar_Menu">
      <div class="Sidebar_Toggle" @click="toggleSidebarCollapse">
        <IconMenu
          :collapse="ui.sidebarCollapse"
          :icon="ui.sidebarCollapse ? 'd-arrow-right' : 'd-arrow-left'"
        >
          Collapse
        </IconMenu>
      </div>
      <Signin :collapse="ui.sidebarCollapse" class="Sidebar_Signin" />
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import Signin from "../components/Signin.vue"
import Teams from "./Teams.vue"
import IconMenu from "../components/IconMenu.vue"
import uiTypes from "../store/modules/ui/types"
export default {
  name: "Sidebar",
  computed: {
    ...mapState(["initialized", "ui"]),
  },
  methods: {
    ...mapMutations({
      toggleSidebarCollapse: uiTypes.TOGGLE_SIDEBAR_COLLAPSE,
    }),
  },
  components: {
    Teams,
    Signin,
    IconMenu,
  },
}
</script>


<style lang="scss" scoped>
.Sidebar {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  grid-row: 1;
  grid-column: 1;
  padding: 5px;
  overflow: hidden;
  border-right: 1px solid #eee;
  margin-right: 3px;
  color: #fff;
  background-color: #1c2938;
  transition: width 200ms ease;
  font-size: 14px;
  &_Menu {
    margin-top: auto;
  }
}
</style>
