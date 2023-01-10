import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainRecordView from "../views/MainRecordView.vue";
import MainSelectView from "../views/MainSelectView.vue";
import MainResultsView from "../views/MainResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mainrecord",
      name: "mainrecord",
      component: MainRecordView,
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
      path: "/record",
      name: "record",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
  ],
});

export default router;
