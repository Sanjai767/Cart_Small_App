import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import ProductsPage from '../pages/ProductsPage.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import UserCart from '../components/UserCart.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardPage },
  { path: '/products', component: ProductsPage },
  { path: '/orders', component: OrdersPage },
  { path: '/cart', component: UserCart },
]

const router = createRouter({
  history: createWebHashHistory(), // <-- changed
  routes,
})

export default router
