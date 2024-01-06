<template>
  <div class="w-full text-white">
    <NuxtLayout>
      <main>
        <NuxtPage/>
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Autenticación App',
  meta: [ { name: 'description', content: 'Ejemplo de autenticación en Nuxt 3' } ]
})
</script>