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
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/login.vue")
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/auth/register.vue")
      },
      {
        path: "/db",
        name: "db",
        component: () => import("../views/auth/db.vue"),
        meta: {requiresAuth: true}
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("jwt") == null) {
        next({
          path: "/login"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;