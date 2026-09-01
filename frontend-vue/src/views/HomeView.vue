<template>
  <div>
    <HeroSection />

    <section class="section">
      <h2>Productos destacados</h2>
      <div class="cards-grid">
        <ProductCard v-for="item in featuredProducts" :key="item.name" :product="item" />
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from '../components/ui/HeroSection.vue'
import ProductCard from '../components/ui/ProductCard.vue'

const featuredProducts = [
  {
    name: 'Multímetro industrial',
    description: 'Alta precisión para mediciones eléctricas.',
    image: 'https://ingprosuppliers.com/imagenes/logo.png'
  },
  {
    name: 'Equipo de prueba',
    description: 'Soluciones para mantenimiento y diagnóstico.',
    image: 'https://ingprosuppliers.com/imagenes/logo.png'
  },
  {
    name: 'Herramienta especializada',
    description: 'Diseñada para entornos exigentes.',
    image: 'https://ingprosuppliers.com/imagenes/logo.png'
  }
]
</script>
