import { createRouter, createWebHistory } from "vue-router";
//import MainRecordView from "../views/MainRecordView.vue";
import MainSelectView from "../views/MainSelectView.vue";
import MainResultsView from "../views/MainResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue")
    },
    {
      path: "/mainrecord",
      name: "mainrecord",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MainRecordView.vue")
    },
    {
      path: "/mainselect",
      name: "mainselect",
      component: MainSelectView,
    },
    {
      path: "/mainresults",
      name: "mainresults",
      component: MainResultsView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/select",
      name: "select",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SelectView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
    {
      path: "/graph",
      name: "graph",
      component: () => import("../views/GraphView.vue"),
    }
  ],
});

export default router;
