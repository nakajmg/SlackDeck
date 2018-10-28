import types from "./types"
export default {
  state: {
    sidebarCollapse: false,
  },
  mutations: {
    [types.TOGGLE_SIDEBAR_COLLAPSE](state) {
      state.sidebarCollapse = !state.sidebarCollapse
    },
  },
}
