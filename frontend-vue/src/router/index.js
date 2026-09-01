import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('../views/ProductosView.vue')
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: () => import('../views/MarcasView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/CarritoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
