<template>
  <section class="section">
    <h2>Catálogo de productos</h2>
    <div class="cards-grid">
      <ProductCard v-for="item in products" :key="item.name" :product="item" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../components/ui/ProductCard.vue'

const products = [
  { name: 'Equipo de medición', description: 'Precisión y control', image: 'https://ingprosuppliers.com/imagenes/logo.png' },
  { name: 'Herramienta eléctrica', description: 'Diseño profesional', image: 'https://ingprosuppliers.com/imagenes/logo.png' },
  { name: 'Accesorio industrial', description: 'Durabilidad y rendimiento', image: 'https://ingprosuppliers.com/imagenes/logo.png' }
]
</script>
