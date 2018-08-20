import Vue from "vue"
import Router from "vue-router"
import Root from "./pages/Root"
import Signin from "./pages/Signin"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "root",
      component: Root,
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    // },
  ],
})
