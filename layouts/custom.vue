<template>
    <div class="container mx-auto mt-6 mb-16">
        <h1 class="text-4xl font-bold">
            Autenticacion
            <span class="font-extrabold text-transparent bg-gradient-to-br from-cyan-700 via-green-500 to-blue-900 bg-clip-text">App</span>
        </h1>

        <!-- Links -->
        <nav>
            <ul class="flex gap-5 mt-3">
                <li>
                    <NuxtLink class="mr-10" :to="{ name: 'index' }">Hola, {{ usuario.nombreUsuario }} </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="`/perfil/${usuario.uuid}`">
                        Perfil
                    </NuxtLink>
                </li>
                <li>
                    <button @click="store.cerrarSesion()" >Cerrar Sesion</button>
                </li>
            </ul>
        </nav>
    </div>
    <slot/>
</template>

<script setup lang="ts">
import type { Perfil } from '~/types/tipos'

const usuario = reactive <Perfil> ({
    tipo: '',
    uuid: '',
    nombreUsuario: '',
    rol: '',
    correo: ''
})

const store = useAutenticacionStore()

onMounted(async () => {
    const aux = await store.perfil()
    Object.assign( usuario, aux )
})
</script>