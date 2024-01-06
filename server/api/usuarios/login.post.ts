import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient, type Usuario } from '@prisma/client'
import type { Respuesta, RespuestaLogin } from '~/types/tipos'
import generarJWT from '~/utils/server/generarJWT';

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { correo, contraseña } = await readBody( event );

    let respuesta: Respuesta = { tipo: '', msg: ''};
    let respuestaLogin: RespuestaLogin = {
        tipo: '', 
        id: 0, 
        uuid: '',
        nombreUsuario: '',
        correo: '', 
        webToken: '',
        rol: ''
    };

    // Buscar usuario
    await prisma.usuario.findFirst({
        where: {
            correo: correo
        }
    })
        .then( async response => {
            // Si el usuario no fue encontrado
            if( response === null ) {
                respuesta = { tipo: 'error', msg: 'Usuario No Registrado' };
                return;
            } 

            // Determinar si está confirmado
            if( !response?.confirmado ) {
                respuesta = { tipo: 'error', msg: 'Usuario No Confirmado' };
                return;
            }

            // Comprobar contraseña
            const contraseñaCorrecta = await bcrypt.compare( contraseña, response.contrasenia );
            
            if( !contraseñaCorrecta ) {
                respuesta = { tipo: 'error', msg: 'Contraseña Incorrecta' };
                return;
            }

            // Si las validacion fueron correctas
            respuestaLogin = {
                tipo: 'hecho',
                id: response.id,
                uuid: response.uuid,
                nombreUsuario: response.nombre_usuario,
                correo: response.correo,
                rol: response.rol,
                webToken: generarJWT( response.uuid, response.rol )
            }

            // Marcar que esta iniciando sesion
            await prisma.usuario.update({
                where: {
                    id: response.id
                },
                data: {
                    sesion_iniciada: !response.sesion_iniciada
                }
            })
        })
        .catch( error => {
            console.log(error)
        })
    
    // Determinar que respuesta enviar
    if( respuesta.tipo !== 'error' )
        return respuestaLogin
    else
        return respuesta
})