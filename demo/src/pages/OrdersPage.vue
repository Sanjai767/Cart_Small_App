<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">Orders</h1>

    <v-card>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Order ID</th>
            <th class="text-left">Product</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td>{{ o.id }}</td>
            <td>{{ o.product }}</td>
            <td>{{ o.qty }}</td>
            <td>₹ {{ o.amount.toLocaleString() }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import store from '@/store/data'

const { orders } = store
</script>
