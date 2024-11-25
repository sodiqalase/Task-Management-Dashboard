import { createRouter, createWebHistory } from "vue-router";

// import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Overview from "../pages/overview/OverviewPage.vue";
import Task from "../pages/task-management/TaskManagementPage.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";

const routes = [
    {
        path: "/dashboard",
        component: DashboardLayout,
        children: [
            {
                path: "overview",
                name: "Overview",
                component: Overview,
            },
            {
                path: "task-management",
                name: "Users",
                component: Task,
            },
        ],
    },
    {
        path: "/",
        redirect: "/dashboard/overview",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
