<template>
  <header class="Sidebar">
    <Teams class="Sidebar_Teams" v-if="initialized" />
    <div class="Sidebar_Menu">
      <Signin class="Sidebar_Signin" />
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex"
import Signin from "../components/Signin.vue"
import Teams from "./Teams.vue"
import IconMenu from "../components/IconMenu.vue"
export default {
  name: "Sidebar",
  computed: {
    ...mapState(["initialized"]),
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
