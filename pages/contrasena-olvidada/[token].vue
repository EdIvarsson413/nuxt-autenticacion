<template>
    <article class="w-1/2 p-5 mx-auto border-2 border-white rounded-md border-opacity-35">
        <p class="text-2xl font-semibold text-center mb-7">Nueva Contraseña</p>

        <form class="grid w-4/5 mx-auto text-center">
            <Mensaje :tipo="mensaje.tipo.toString()">{{ mensaje.msg }}</Mensaje>
            
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="password" 
                placeholder="Nueva Contraseña"
                v-model="contraseña"
            >
            <input 
                class="py-1 mt-5 mb-10 text-lg rounded-md hover:font-semibold bg-gradient-to-tr from-green-600 to-blue-400 hover:bg-gradient-to-bl"
                type="button" 
                value="Reestablecer cuenta"
                @click="recuperarCuenta"
            >
        </form>

        <p>
            Ingresa una nueva contraseña o vuelve a ingresar la que perdiste
        </p>
    </article>
</template>

<script setup lang="ts">
import type { Respuesta } from '~/types/tipos'

const route = useRoute();
const { token } = route.params;

const store = useAutenticacionStore();

const contraseña = ref <string> ('');
const mensaje = reactive <Respuesta> ({
    tipo: '',
    msg: ''
})

const recuperarCuenta = async () => {
    if( contraseña.value.length === 0 ) {
        Object.assign( mensaje, { tipo: 'error', msg: 'Contraseña Vacía' } );
        reiniciar();
        return;
    }

    const respuesta = await store.nuevaContraseña( contraseña.value, token );
    Object.assign( mensaje, respuesta );

    if( mensaje.tipo !== 'hecho' )
        reiniciar()
}

const reiniciar = () => {
    setTimeout(() => {
        Object.assign( mensaje, { tipo: '', msg: '' } );
    }, 2000);
}

useHead({
    title: `Autenticación App - Nueva Contraseña`
})
</script>