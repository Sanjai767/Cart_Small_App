<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">User Cart</h1>

    <!-- PRODUCT LIST -->
    <v-row>
      <v-col
        v-for="p in products"
        :key="p.id"
        cols="12" sm="6" md="3"
      >
        <v-card class="pa-4">

  <div class="text-center mb-2">
    <h3 class="text-h6">{{ p.name }}</h3>

    <v-badge v-if="p.stock === 0" dot color="red">
      <span class="caption red--text">Out</span>
    </v-badge>
  </div>

  <div class="d-flex justify-space-around mb-3">
    <p class="text-subtitle-2">Price: ₹ {{ p.price }}</p>
    <p class="text-subtitle-2">Stock: {{ p.stock }}</p>
  </div>

  <!-- QTY BUTTONS -->
  <div class="d-flex justify-center align-center">
    <v-btn
      icon
      @click="decreaseQty(p.id)"
      :disabled="cart[p.id] === 0"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <span class="mx-3 text-h6">{{ cart[p.id] }}</span>

    <v-btn
      icon
      @click="increaseQty(p.id, p.stock)"
      :disabled="cart[p.id] >= p.stock || p.stock === 0">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>

</v-card>

      </v-col>
    </v-row>

    <v-card class="pa-4 mt-6" v-if="selectedItems.length > 0">
      <h3 class="text-h6 mb-3">Cart Summary</h3>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in selectedItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.qty }}</td>
            <td>₹ {{ item.amount.toLocaleString() }}</td>
          </tr>
        </tbody>
      </v-table>

      <div class="text-right text-h6 mt-3">
        Total: <strong>₹ {{ cartTotal.toLocaleString() }}</strong>
      </div>

      <div class="d-flex justify-end mt-4">
        <v-btn color="grey" class="me-3" @click="clearCart">Clear</v-btn>
        <v-btn color="blue" @click="submitOrders">Submit Order</v-btn>
      </div>
    </v-card>

    <p v-if="message" class="mt-3 text-success">{{ message }}</p>
  </v-container>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import store from '@/store/data'

const { products, addOrder } = store

const cart = reactive({})

// initialize cart
products.value.forEach(p => (cart[p.id] = 0))

const increaseQty = (id, stock) => {
  if (cart[id] < stock) cart[id]++
}

const decreaseQty = (id) => {
  if (cart[id] > 0) cart[id]--
}

// Selected products for cart table
const selectedItems = computed(() =>
  products.value
    .filter(p => cart[p.id] > 0)
    .map(p => ({
      id: p.id,
      name: p.name,
      qty: cart[p.id],
      amount: cart[p.id] * p.price
    }))
)

// Cart total
const cartTotal = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + item.amount, 0)
)

const message = ref("")

// Submit order
const submitOrders = () => {
  let placed = false

  selectedItems.value.forEach(item => {
    const ok = addOrder({ productId: item.id, qty: item.qty })
    if (ok) {
      cart[item.id] = 0
      placed = true
    }
  })

  message.value = placed
    ? "Order submitted successfully!"
    : "No items available or insufficient stock."

  setTimeout(() => (message.value = ""), 2000)
}

// Clear cart
const clearCart = () => {
  Object.keys(cart).forEach(id => (cart[id] = 0))
}
</script>

<style scoped>
.text-success { color: #2e7d32; }
</style>
