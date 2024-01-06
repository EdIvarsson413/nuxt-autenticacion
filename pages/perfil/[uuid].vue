<template>
    <article class="w-4/5 mx-auto">
        <h2 class="mb-5 text-4xl text-center">Tus Datos</h2>

        <section>
            <form class="grid w-1/2 mx-auto">
                <Mensaje :tipo="mensaje.tipo.toString()">{{ mensaje.msg }}</Mensaje>
                
                <label class="p-3 my-5 text-lg text-black bg-white rounded-md ">
                    Fecha de registro: {{ usuario.registro }}
                </label>
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md "
                    type="text" 
                    :placeholder="usuario.uuid.toString()"
                    disabled
                >
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md"
                    type="text" 
                    placeholder="Nombre"
                    v-model="usuario.nombre"
                >
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md"
                    type="text" 
                    placeholder="Apellido"
                    v-model="usuario.apellido"
                >
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md"
                    type="text" 
                    placeholder="Nombre de Usuario"
                    v-model="usuario.nombreUsuario"
                >
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md"
                    type="text" 
                    :placeholder="usuario.correo.toString()"
                    disabled
                >
                <input 
                    class="p-3 my-5 text-lg text-black rounded-md"
                    type="text" 
                    :placeholder="usuario.rol.toString().toUpperCase()"
                    disabled
                >
                <input 
                    class="py-1 mt-5 mb-10 text-lg rounded-md hover:font-semibold bg-gradient-to-tr from-green-600 to-blue-400 hover:bg-gradient-to-bl"
                    type="button" 
                    value="Cambiar Datos"
                    @click="cambiarDatos"
                >
            </form>
        </section>
    </article>
</template>

<script setup lang="ts">
import type { Usuario, Respuesta } from '~/types/tipos'

const route = useRoute();
const router = useRouter();
const { uuid } = route.params; 

const store = useAutenticacionStore()

onMounted(async () => {
    const respuesta = await store.datos( uuid )
    Object.assign( usuario, respuesta )

    useHead({
        title: `Perfil - ${usuario.nombreUsuario}`
    })
})

const usuario = reactive <Usuario> ({
    tipo: '',
    uuid: '',
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    rol: '',
    correo: '',
    contraseña: '',
    registro: ''
})

const mensaje = reactive <Respuesta> ({
    tipo: '',
    msg: ''
})

const cambiarDatos = async () => {
    const aux = {
        nombre: toRaw(usuario.nombre),
        apellido: toRaw(usuario.apellido),
        nombreUsuario: toRaw(usuario.nombreUsuario),
    }

    if( Object.values( aux ).includes('') ) {
        Object.assign( mensaje, { tipo: 'error', msg: 'Campos Obligatorios' } );
        reiniciar();
        return;
    }
    
    const respuesta = await store.cambiarDatos( aux );
    Object.assign( mensaje, respuesta );

    if( mensaje.tipo !== 'hecho' ) {
        reiniciar();
        return;
    } else
        router.go(0)
}

const reiniciar = () => {
    setTimeout(() => {
        Object.assign( mensaje, { tipo: '', msg: '' } );
    }, 2000);
}

// Prteccion de ruta
definePageMeta({
    middleware: 'auth'
})
</script>