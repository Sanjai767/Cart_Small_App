import { ref, computed } from "vue";

/*PRODUCTS */
export const products = ref([
  { id: 1, name: "Laptop", price: 55000, stock: 10, image: "https://via.placeholder.com/250?text=Laptop" },
  { id: 2, name: "Mobile", price: 22000, stock: 25, image: "https://via.placeholder.com/250?text=Mobile" },
  { id: 3, name: "Headphones", price: 2500, stock: 50, image: "https://via.placeholder.com/250?text=Headphones" },
  { id: 4, name: "Keyboard", price: 1200, stock: 15, image: "https://via.placeholder.com/250?text=Keyboard" },
]);

// Auto increment ID
const nextProductId = () =>
  products.value.length
    ? Math.max(...products.value.map(p => p.id)) + 1
    : 1;

/* ADD PRODUCT */
function addProduct({ name, price, stock }) {
  if (!name || price <= 0 || stock < 0) return false;

  products.value.push({
    id: nextProductId(),
    name,
    price,
    stock,
  });

  return true;
}

/* EDIT PRODUCT */
function editProduct(id, updated) {
  const product = products.value.find(p => p.id === id);
  if (!product) return false;

  product.name = updated.name ?? product.name;
  product.price = updated.price ?? product.price;
  product.stock = updated.stock ?? product.stock;

  return true;
}

/* DELETE PRODUCT */
function deleteProduct(id) {
  const index = products.value.findIndex(p => p.id === id);
  if (index === -1) return false;

  products.value.splice(index, 1);
  return true;
}

/*ORDERS */
const orders = ref([
  { id: 1, product: "Laptop", qty: 1, amount: 55000 }
]);

const nextOrderId = () =>
  orders.value.length
    ? Math.max(...orders.value.map(o => o.id)) + 1
    : 1;

function addOrder({ productId, qty }) {
  const product = products.value.find(p => p.id === productId);

  if (!product || qty <= 0 || product.stock < qty) return false;

  const amount = product.price * qty;

  orders.value.push({
    id: nextOrderId(),
    product: product.name,
    qty,
    amount,
  });

  product.stock -= qty;
  return true;
}

/*DASHBOARD COMPUTED*/
const totalProducts = computed(() => products.value.length);
const totalOrders = computed(() => orders.value.length);
const totalRevenue = computed(() =>
  orders.value.reduce((sum, o) => sum + o.amount, 0)
);

export default {
  products,
  orders,

  totalProducts,
  totalOrders,
  totalRevenue,

  addProduct,
  editProduct,
  deleteProduct,
  addOrder
};
