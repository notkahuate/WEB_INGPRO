<template>
  <section class="section">
    <h2>Marcas destacadas</h2>
    <div class="cards-grid">
      <article v-for="brand in brands" :key="brand.name" class="product-card">
        <h3>{{ brand.name }}</h3>
        <p>{{ brand.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const brands = [
  { name: 'Fluke', description: 'Instrumentación de precisión.' },
  { name: 'Megger', description: 'Soluciones de prueba y mantenimiento.' },
  { name: 'UNI-T', description: 'Herramientas tecnológicas accesibles.' }
]
</script>
