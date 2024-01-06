<template>
    <p 
        v-if="errorExito"
        :class="[error ? 'text-red-900 bg-red-400' : 'text-green-900 bg-green-400']"
        class="py-1 text-xl font-bold text-center rounded-md"
    >
        <slot/>
    </p>
</template>

<script setup>
const props = defineProps({
    tipo: String
})

const errorExito = computed(() => {
    return props.tipo === 'error' || props.tipo === 'hecho'
})

const error = computed(() => {
    return props.tipo === 'error' 
})
</script>