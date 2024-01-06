import { PrismaClient } from "@prisma/client"
import type { Respuesta } from "~/types/tipos"

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { token } = getRouterParams ( event );
    let respuesta: Respuesta = { tipo: '', msg: '' }
    
    const usuario = await prisma.usuario.findFirst({
        where: {
            token: token
        }
    })

    if( usuario ) {
        await prisma.usuario.update({
            where: {
                id: usuario.id
            },
            data: {
                token: '',
                confirmado: true
            }
        })
            .then( response => { 
                respuesta = { tipo: 'hecho', msg: 'Usuario Confirmado' }
            })
            .catch( error => { console.log(error) })
    } else {
        respuesta = { tipo: 'error', msg: 'Usuario Confirmado o No Existe' }
    }

    return {
        tipo: respuesta.tipo,
        msg: respuesta.msg
    }
})