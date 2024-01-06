<template>
    <div class="container mx-auto mt-6 mb-16">
        <p class="text-4xl font-bold">
            Autenticacion
            <span class="font-extrabold text-transparent bg-gradient-to-br from-cyan-700 via-green-500 to-blue-900 bg-clip-text">App</span>
        </p>

        <!-- Links -->
        <nav>
            <ul class="flex gap-5 mt-3">
                <li>    
                    <NuxtLink :to="{ name: 'index' }">Inicio</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="{ name: 'login' }">Iniciar Sesion</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="{ name: 'registro' }">Registrarse</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
    <div>
        <slot/>
    </div>
</template>

<script setup>

</script>