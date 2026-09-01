<template>
  <header class="site-header">
    <div class="header-top">
      <router-link to="/" class="brand">
        <img src="https://ingprosuppliers.com/imagenes/logo_blanco.png" alt="INGPRO" />
      </router-link>

      <div class="search-box">
        <input type="text" placeholder="Buscar productos" />
        <button>Buscar</button>
      </div>

      <nav class="header-actions">
        <router-link to="/productos">Productos</router-link>
        <router-link to="/marcas">Marcas</router-link>
        <router-link to="/carrito">Carrito (0)</router-link>
      </nav>
    </div>
  </header>
</template>
