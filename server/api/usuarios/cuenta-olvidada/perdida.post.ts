import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import enviarCorreo from '~/utils/server/enviarCorreo'
import type { Respuesta } from '~/types/tipos'

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { correo } = await readBody( event );

    // Respuestas de la peticion
    let respuesta: Respuesta = { tipo: '', msg: '' };

    // Buscar usuario
    await prisma.usuario.findFirst({
        where:{ correo: correo }
    })
        .then( async usuario => {
            // Si no existe
            if( !usuario ) {
                respuesta = { tipo: 'error', msg: 'Usuario No Registrado' };
                return;
            }

            // Si existe
            const token = randomUUID();

            await prisma.usuario.update({
                where: { id: usuario.id },
                data: { token: token }
            })
                .then( usuario => {
                    enviarCorreo( 
                        usuario.correo, 
                        usuario.nombre_usuario, 
                        usuario.token, 
                        'recuperar' 
                    )
                })

            // Enviar respuesta
            respuesta = { tipo: 'hecho', msg: 'Hemos enviado un correo con instrucciones' }
        })
        .catch( error => { console.log(error) })
    
    return respuesta
})