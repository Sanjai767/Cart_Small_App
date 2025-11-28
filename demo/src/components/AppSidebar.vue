<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :permanent="!mobile"
    temporary
    width="220"
  >
    <!-- VUE LOGO (Desktop Only) -->
    <div v-if="!mobile" class="pa-4 text-center" style="border-bottom: 1px solid #ddd;">
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
        height="31"
        contain
      ></v-img>
 </div>

    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        link
        :active-class="'blue--text text--accent-4'"
        @click="onMenuClick"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const drawer = ref(false)
const mobile = ref(false)

const menuItems = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Products', path: '/products' },
  { title: 'Orders', path: '/orders' },
  { title: 'Cart', path: '/cart' },
]

const checkMobile = () => {
  mobile.value = window.innerWidth < 960
  if (!mobile.value) drawer.value = true
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  window.addEventListener('toggle-drawer', () => {
    drawer.value = !drawer.value
  })
})

const onMenuClick = () => {
  if (mobile.value) drawer.value = false
}
</script>

<style scoped>
</style>
