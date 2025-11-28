<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">Dashboard</h1>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="3">
          <h2 class="text-h6">Total Products</h2>
          <p class="mt-2 text-h5">{{ totalProducts }}</p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="3">
          <h2 class="text-h6">Total Orders</h2>
          <p class="mt-2 text-h5">{{ totalOrders }}</p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="3">
          <h2 class="text-h6">Revenue</h2>
          <p class="mt-2 text-h5">₹ {{ totalRevenue.toLocaleString() }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import store from '@/store/data'

const { totalProducts, totalOrders, totalRevenue } = store
</script>
