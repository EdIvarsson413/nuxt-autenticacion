import { PrismaClient } from "@prisma/client"
import type { Usuario, Respuesta } from "~/types/tipos"

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const token = getHeaders( event ).authorization?.split(' ')[1];
    const { uuid } = getRouterParams( event );

    // Respuestas de la peticion
    let respuesta: Respuesta = { tipo: '', msg: '' }
    let usuario: Usuario = {
        tipo: '',
        uuid: '',
        nombre: '',
        apellido: '',
        nombreUsuario: '',
        rol: '',
        correo: '',
        contraseña: '',
        registro: ''
    }

    if( !token || token.length === 4 ) {
        respuesta = { tipo: 'error', msg: 'Token No Válido' };
    } else {
        // Buscar usuario
        await prisma.usuario.findFirst({
            where: { uuid: uuid }
        })
            .then( response => {
                if( !response ) {
                    respuesta = { tipo: 'error', msg: 'Ususario No Valido' };
                    return;
                }

                usuario.tipo = 'hecho'
                usuario.uuid = response.uuid
                usuario.nombre = response.nombre
                usuario.apellido = response.apellido
                usuario.nombreUsuario = response.nombre_usuario
                usuario.rol = response.rol
                usuario.correo = response.correo
                usuario.contraseña = response.contrasenia
                usuario.registro = response.fecha_registro.toISOString().substring(0, 10)
            })
    }

    // Determinar que respuesta enviar
    if( respuesta.tipo !== 'error' )
        return usuario
    else
        return respuesta
})