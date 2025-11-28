<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">Products</h1>

    <v-btn color="blue" class="mb-4" @click="openAddDialog">
      Add Product
    </v-btn>

    <v-card>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.price }}</td>
            <td>{{ p.stock }}</td>

            <td>
              <v-btn size="small" color="green" class="me-2" @click="openEditDialog(p)">
                Edit
              </v-btn>

              <v-btn size="small" color="red" @click="deleteItem(p.id)">
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- ADD / EDIT Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="pa-4">

        <h3 class="text-h6 mb-3">
          {{ editId ? "Edit Product" : "Add Product" }}
        </h3>

        <v-text-field v-model="form.name" label="Product Name"></v-text-field>
        <v-text-field v-model="form.price" type="number" label="Price"></v-text-field>
        <v-text-field v-model="form.stock" type="number" label="Stock"></v-text-field>

        <v-btn block color="blue" class="mt-3" @click="saveProduct">
          Save
        </v-btn>

        <v-btn block color="grey" class="mt-2" @click="dialog = false">
          Cancel
        </v-btn>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store/data";

const { products, addProduct, editProduct, deleteProduct } = store;

const dialog = ref(false);
const editId = ref(null);

const form = ref({
  name: "",
  price: "",
  stock: ""
});

// open add dialog
function openAddDialog() {
  editId.value = null;
  form.value = { name: "", price: "", stock: "" };
  dialog.value = true;
}

// open edit dialog
function openEditDialog(product) {
  editId.value = product.id;
  form.value = { 
    name: product.name,
    price: product.price,
    stock: product.stock
  };
  dialog.value = true;
}

function saveProduct() {
  const data = {
    name: form.value.name,
    price: Number(form.value.price),
    stock: Number(form.value.stock),
  };

  if (editId.value) {
    editProduct(editId.value, data);
  } else {
    addProduct(data);
  }

  dialog.value = false;
}

function deleteItem(id) {
  deleteProduct(id);
}
</script>
