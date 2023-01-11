import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test/:url",
    name: "test",
	meta: {
		title: "Test"
	},
    component: () => import("../views/TestView.vue"),
  },
  {
    path: "/test/select/:url",
    name: "testselect",
	meta: {
		title: "Výběr testu"
	},
    component: () => import("../views/TestSelector.vue"),
  },
  {
    path: "/tests/all",
    name: "testoverview",
	meta: {
		title: "Přehled testů"
	},
    component: () => import("../views/TestsOverview.vue"),
  },
  {
    path: "/tests/history",
    name: "testhistory",
	meta: {
		title: "Historie testů"
	},
    component: () => import("../views/TestHistoryOverview.vue"),
  },
  {
    path: "/tests/unfinished",
    name: "testsunfinished",
	meta: {
		title: "Nedokončené testy"
	},
    component: () => import("../views/TestUnfinishedOverview.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = 'Lajtkep tester';
router.afterEach((to, from) => {
	document.title = (to.meta.title || DEFAULT_TITLE) + "";
});

export default router;
