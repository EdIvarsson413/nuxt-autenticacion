import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"
import type { Respuesta } from "~/types/tipos"

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { contraseña } = await readBody( event );
    const { token } = getRouterParams( event );
    const salt = await bcrypt.genSalt( 10 );

    // Respuestas de la peticion
    let respuesta: Respuesta = { tipo: '', msg: '' }


    // Validar token
    if( !token ) {
        respuesta = { tipo: 'error', msg: 'Token No Válido' }
    } else {
        // Buscar usuario
        await prisma.usuario.findFirst({
            where: { token: token }
        })
            .then( async usuario => {
                if( !usuario ) {
                    respuesta = { tipo: 'error', msg: 'Usuario No Registrado' };
                    return;
                }

                // Si existe se cambia la contraseña
                await prisma.usuario.update({
                    where: { id: usuario.id },
                    data: {
                        contrasenia: await bcrypt.hash( contraseña, salt ),
                        token: ''
                    }
                })

                respuesta = { tipo: 'hecho', msg: 'Contraseña Restablecida, Inicie Sesion' }
            })
            .catch( error => { console.log(error) })
    }
    
    return respuesta
})