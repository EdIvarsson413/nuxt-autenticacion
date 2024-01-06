<template>
    <article class="w-1/2 p-5 mx-auto border-2 border-white rounded-md border-opacity-35">
        <p class="text-2xl font-semibold text-center mb-7">Iniciar Sesion</p>

        
        <form class="grid w-4/5 mx-auto text-center">
            <Mensaje :tipo="errorState.tipo.toString()">{{ errorState.msg }}</Mensaje>
            
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
                value="Iniciar Sesion"
                @click="login"
            >
            
            <NuxtLink to="/contrasena-olvidada/recuperar">
                Olvidé mi contaseña
            </NuxtLink>
        </form>
    </article>
</template>

<script setup lang="ts">
import type { Login, Respuesta } from '~/types/tipos'

const datos = reactive <Login> ({
    correo: 'laloramirez.vengeance@gmail.com',
    contraseña: 'contraseña'
})

const errorState = reactive <Respuesta> ({
    tipo: '',
    msg: ''
}) 

const store = useAutenticacionStore()

const login = async () => {
    if( Object.values( datos ).includes('') ) {
        Object.assign( errorState, { tipo: 'error', msg: 'Campos Vacios' } );
        reiniciar();
        return;
    }

    const errores = await store.iniciarSesion( datos.correo, datos.contraseña );
    Object.assign( errorState, errores );

    if( hayErroes.value ) {
        reiniciar()
    }
}

const reiniciar = () => {
    setTimeout(() => {
        Object.assign( errorState, { tipo: '', msg: '' } );
    }, 2000);
}

const hayErroes = computed(() => { return errorState.tipo === 'error' })

useHead({
    title: 'Autenticación App - Iniciar Sesión'
})
</script>