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
		component: () => import("../views/TestView.vue"),
	},
	{
		path: "/tests/all",
		name: "testoverview",
		component: () => import("../views/TestsOverview.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
