<template>
    <div class="w-1/2 p-5 mx-auto border-2 border-white rounded-md border-opacity-35">
        <p class="text-2xl font-semibold text-center mb-7">Registrarse</p>

        <form class="grid w-4/5 mx-auto">
            <Mensaje :tipo="error.tipo.toString()"> {{ error.msg }} </Mensaje>

            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="text" 
                placeholder="Nombre"
                v-model="datos.nombre"
            >
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="text" 
                placeholder="Apellido"
                v-model="datos.apellido"
            >
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="text" 
                placeholder="Nombre de Usuario"
                v-model="datos.nombreUsuario"
            >
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="text" 
                placeholder="Correo"
                v-model="datos.correo"
            >
            <input 
                class="p-3 my-5 text-lg text-black rounded-md"
                type="password" 
                placeholder="Contraseña"
                v-model="datos.contraseña"
            >
            <input 
                class="py-1 mt-5 mb-10 text-lg rounded-md hover:font-semibold bg-gradient-to-tr from-green-600 to-blue-400 hover:bg-gradient-to-bl"
                type="button" 
                value="Registrase"
                @click="realizarRegistro()"
            >
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Respuesta, UsuarioRegistro } from '~/types/tipos'

const store = useAutenticacionStore();

const datos = reactive <UsuarioRegistro> ({
    nombre: 'Eduardo',
    apellido: 'Espino',
    nombreUsuario: 'Lalo Ramirez',
    correo: 'laloramirez.vengeance@gmail.com',
    contraseña: '$NuxtAdmin$contraseña'
})

const error = reactive <Respuesta> ({
    tipo: '',
    msg: ''
})

const realizarRegistro = async () => {
    if( Object.values( datos ).includes('') ) {
        Object.assign( error, { tipo: 'error', msg: 'Campos Obligatorios' } );
        reiniciar();
        return;
    }

    const respuesta = await store.registarse( datos );
    Object.assign( error, respuesta );
    
    if( error.tipo !== 'hecho' ) 
        reiniciar()
}

const reiniciar = () => {
    setTimeout(() => {
        Object.assign( error, { tipo: '', msg: '' } );
    }, 2000);
}

useHead({
    title: 'Autenticación App - Registrarse'
})
</script>