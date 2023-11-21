import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meseros', //Ruta usuarios
    name: 'Meseros',
    component: () => import('../views/Mesero.vue')
  },
  {
    path: '/mesas', //Ruta bebida
    name: 'Mesas',
    component: () => import('../views/Mesa.vue')
  },
  {
    path: '/bebidas', //Ruta bebida
    name: 'Bebidas',
    component: () => import('../views/Bebida.vue')
  },
  {
    path: '/comidas', //Ruta comida
    name: 'Comidas',
    component: () => import('../views/Comida.vue')
  },
  {
    path: '/ordenes', //Ruta comida
    name: 'Ordenes',
    component: () => import('../views/Orden.vue')
  },
  {
    path: '/consultas', //Ruta comida
    name: 'Consultas',
    component: () => import('../views/Consulta.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
