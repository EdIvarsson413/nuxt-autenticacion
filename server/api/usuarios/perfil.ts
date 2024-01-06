import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import type { Perfil, Respuesta } from '~/types/tipos'

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig( event );
    const firma: Secret = config.JWT_FIRMA;
    
    // Respuestas
    let respuesta: Respuesta = { tipo: '', msg: '' }
    let respuestaPerfil: Perfil = { 
        tipo: '',
        uuid: '',
        rol: '',
        nombreUsuario: '',
        correo: ''
    }

    // Obtener JWT
    const token = getHeaders( event ).authorization?.split(' ')[1];
    
    // Si no hay token;
    if( !token || token.length === 4 ) {
        respuesta = { tipo: 'error', msg: 'Token No Válido' };
        
    } else {
        // Decodificar token
        const decrifrado = <JwtPayload> jwt.verify( token, firma );
        
        // Buscar usuario
        await prisma.usuario.findFirst({
            where: {
                uuid: decrifrado.uuid
            }
        })
            .then( usuario => {
                if( !usuario ) {
                    respuesta = { tipo: 'error', msg: 'Usuario No Registrado' };
                    return;
                }

                // Si el usuario fue encontrado
                respuestaPerfil = {
                    tipo: 'hecho',
                    uuid: usuario.uuid,
                    rol: usuario.rol,
                    nombreUsuario: usuario.nombre_usuario,
                    correo: usuario.correo
                }
            })
            .catch( error => {
                console.log(error)
            })
    }

    // Determinar que respuesta enviar
    if( respuesta.tipo !== 'error' ) 
        return respuestaPerfil
    else
        return respuesta 
})