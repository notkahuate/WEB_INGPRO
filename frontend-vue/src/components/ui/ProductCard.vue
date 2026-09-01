<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" />
    <div class="product-card-body">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <button class="btn btn-primary">Agregar</button>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
