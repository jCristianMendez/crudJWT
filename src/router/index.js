import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Navigation from '../views/Navigation.vue'
const Games = () => import("../views/Games.vue");
const Agenda = () => import("../views/Agenda.vue");
const PaginationGames = () => import("../views/PaginationGames.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/sesion',
    name: 'Navigation',
    component: Navigation,
    children: [
      {
        path: '/',
        name: 'Games',
        component: Games
      },
      {
        path: '/pagination',
        name: 'PaginationGames',
        component: PaginationGames
      },
      {
        path: '/agenda',
        name: 'Agenda',
        component: Agenda
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
