<template>
  <v-app-bar app flat color="light-blue lighten-3">
    <v-app-bar-nav-icon v-if="mobile" @click="toggleSidebar" />

    <v-toolbar-title class="text-center flex-grow-1">Cart App</v-toolbar-title>

    <div class="d-flex align-center">
      <v-btn icon><v-icon dark>mdi-bell</v-icon></v-btn>
      <v-btn icon><v-icon dark>mdi-account</v-icon></v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mobile = ref(false)

const toggleSidebar = () => {
  const event = new CustomEvent('toggle-drawer')
  window.dispatchEvent(event)
}

const checkMobile = () => {
  mobile.value = window.innerWidth < 960
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>
