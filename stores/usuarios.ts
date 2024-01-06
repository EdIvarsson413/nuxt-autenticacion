import { defineStore } from "pinia"
import type { Perfil, RespuestaLogin, Respuesta, UsuarioRegistro } from "~/types/tipos"

export const useAutenticacionStore = defineStore( 'usuarios', () => {
    const cookie = useCookie('jwt', { maxAge: 60 * 60 * 24 * 30 });
    const router = useRouter()
    const login = reactive <RespuestaLogin> ({
        tipo: '',
        id: 0,
        uuid: '',
        nombreUsuario: '',
        correo: '',
        webToken: '',
        rol: ''
    })

    const usuario = reactive <Perfil> ({
        tipo: '',
        uuid: '',
        nombreUsuario: '',
        rol: '',
        correo: ''
    })

    async function registarse( registro: UsuarioRegistro ) {
        const data = await $fetch <Respuesta> ('/api/usuarios/registrar',{
            headers: {
                "client-platform": "browser"
            },
            method: 'post',
            body: {
                nombre: registro.nombre,
                apellido: registro.apellido,
                nombreUsuario: registro.nombreUsuario,
                correo: registro.correo,
                contraseña: registro.contraseña
            }
        })

        return data
    }

    async function iniciarSesion( correo: string, contraseña: string ) {
        const data = await $fetch <RespuestaLogin> ('/api/usuarios/login', {
            headers: {
                "client-platform": "browser"
            },
            method: "post",
            body: {
                correo: correo,
                contraseña: contraseña
            }
        })

        if( data.tipo === 'hecho' ) {
            Object.assign( login, data )

            // Guardar JWT en local storage y cookie
            localStorage.setItem( "jwt", login.webToken.toString() );
            cookie.value = login.webToken.toString();
            router.push('/')
        } else 
            return data
    }

    async function perfil() {
        const token = localStorage.getItem( 'jwt' );
        if( !token ) return;

        await $fetch <Perfil> ('/api/usuarios/perfil', {
            headers: {
                Authorization:  `Bearer ${localStorage.getItem( 'jwt' )}`,
                "client-platform": "browser"
            },
            method: "get",
        })
            .then( response => {
                if( response.tipo = 'hecho' )
                    Object.assign( usuario, response )
                else
                    console.log(response)
            })
            .catch( error => { console.log(error) })
        
        return usuario
    }

    async function confirmar( token: String) {
        const data = await $fetch <Respuesta> (`/api/usuarios/confirmar/${token}`, {
            headers: {
                "client-platform": "browser"
            },
            method: "get",
        })

        return data
    }

    async function enviarCorreo( correo: string ) {
        const data = await $fetch <Respuesta> ('/api/usuarios/cuenta-olvidada/perdida', {
            headers: {
                "client-platform": "browser"
            },
            method: "post",
            body: {
                correo: correo
            }
        })

        return data
    }

    async function nuevaContraseña( contraseña: string, token: string) {
        const data = await $fetch <Respuesta> (`/api/usuarios/cuenta-olvidada/${token}`, {
            headers: {
                "client-platform": "browser"
            },
            method: "post",
            body: {
                contraseña: contraseña
            }
        })

        return data
    }

    async function datos( uuid: string ) {
        const data = await $fetch <Respuesta> (`/api/usuarios/${uuid}`, {
            headers: {
                Authorization:  `Bearer ${localStorage.getItem( 'jwt' )}`,
                "client-platform": "browser"
            },
            method: "get",
        })
        
        return data
    }

    async function cambiarDatos(datos: any) {
        const data = await $fetch <Respuesta> ('/api/usuarios/editar', {
            headers: {
                Authorization:  `Bearer ${localStorage.getItem( 'jwt' )}`,
                "client-platform": "browser"
            },
            method: "put",
            body: {
                nombre: datos.nombre,
                apellido: datos.apellido,
                nombreUsuario: datos.nombreUsuario
            }
        })

        return data
    }

    function cerrarSesion() {
        localStorage.setItem( "jwt", "" );
        useCookie('jwt').value = null
        router.go(0)
    }


    return {
        usuario,
        perfil,
        registarse,
        iniciarSesion,
        confirmar,
        cerrarSesion,
        enviarCorreo,
        nuevaContraseña,
        datos,
        cambiarDatos
    }
})