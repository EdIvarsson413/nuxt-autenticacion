<template>
    <article 
        class="w-1/2 py-20 mx-auto text-center rounded-md"
        :class="[error ? 'text-yellow-900 bg-yellow-200': 'text-green-900 bg-green-400']"
    >
        <p class="text-6xl">{{ mensaje.msg }}</p>
    </article>
</template>

<script setup lang="ts">
import type { Respuesta } from '~/types/tipos'

const route = useRoute();
const { token } = route.params;

const store = useAutenticacionStore();

const mensaje = reactive <Respuesta> ({
    tipo: '',
    msg: ''
})

onMounted(async () => {
    const respuesta = await store.confirmar( token );
    console.log(respuesta)
    Object.assign( mensaje, respuesta )

    useHead({
        title: `Confirmar - ${mensaje.msg}`
    })
})

const error = computed(() => {
    return mensaje.tipo === 'error' 
})

</script>