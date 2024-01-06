<template>
    <article class="w-1/2 p-5 mx-auto border-2 border-white rounded-md border-opacity-35">
        <p class="text-2xl font-semibold text-center mb-7">Recuperar Contraseña</p>

        <form class="grid w-4/5 mx-auto text-center">
            <Mensaje :tipo="mensaje.tipo.toString()">{{ mensaje.msg }}</Mensaje>
            
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="text" 
                placeholder="Correo"
                v-model="correo"
            >
            <input 
                class="py-1 mt-5 mb-10 text-lg rounded-md hover:font-semibold bg-gradient-to-tr from-green-600 to-blue-400 hover:bg-gradient-to-bl"
                type="button" 
                value="Enviarme Instrcciones"
                @click="enviarInstrucciones"
            >
        </form>

        <p>
            Ingresa tu correo para que te enviemos un correo con instrcciones necesarias para recuperar tu cuenta
        </p>
    </article>
</template>

<script setup lang="ts">
import type { Respuesta } from '~/types/tipos'

const store = useAutenticacionStore();

const mensaje = reactive <Respuesta> ({
    tipo: '',
    msg: ''
})

const correo = ref <string> ('')

const enviarInstrucciones = async () => {
    if( correo.value.length === 0 ) {
        Object.assign( mensaje, { tipo: 'error', msg: 'Campo Vacio' } );
        reiniciar();
        return;
    }

    const data = await store.enviarCorreo( correo.value );
    Object.assign( mensaje, data );

    if( mensaje.tipo !== 'hecho' )
        reiniciar()
}

const reiniciar = () => {
    setTimeout(() => {
        Object.assign( mensaje, { tipo: '', msg: '' } );
    }, 2000);
}

useHead({
    title: 'Autenticación App - Recuperar Contraseña'
})
</script>