<template>
  <v-app>
    <AppSidebar ref="sidebar" />
    <AppNavbar @toggle-sidebar="sidebar.drawer = !sidebar.drawer" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppSidebar from './components/AppSidebar.vue'
import AppNavbar from './components/AppNavbar.vue'
</script>
