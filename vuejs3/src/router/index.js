import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'product.index',
        component: () => import("../views/product/Index.vue")
    },
    {
        path: '/create',
        name: 'product.create',
        component: () => import("../views/product/Create.vue")
    },
    {
        path: '/edit/:id',
        name: 'product.edit',
        component: () => import("../views/product/Edit.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;