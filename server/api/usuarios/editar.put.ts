import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"
import type { Respuesta } from "~/types/tipos"

const prisma = new PrismaClient();
const firma: Secret = useRuntimeConfig().JWT_FIRMA

export default defineEventHandler( async (event) => {
    const { nombre, apellido, nombreUsuario } = await readBody( event );
    const token = getHeaders( event ).authorization?.split(' ')[1];

    // Respuestas de la peticiones
    let respuesta: Respuesta = { tipo: '', msg: '' };

    // Validar token
    if( !token ) {
        respuesta = { tipo: 'error', msg: 'Token No Válido' };
    } else {
        // Decifrar token
        const decifrar = <JwtPayload> jwt.verify( token, firma )

        // Buscar usuario
        await prisma.usuario.findFirst({
            where: { uuid: decifrar.uuid }
        })
            .then( async usuario => {
                // Si el usuario no existe
                if( !usuario ) {
                    respuesta = { tipo: 'error', msg: 'Usuario No Registrado' }
                    return;
                }

                // Si existe, se cambian los datos
                await prisma.usuario.update({
                    where: { id: usuario.id },
                    data: {
                        nombre: nombre,
                        apellido: apellido,
                        nombre_usuario: nombreUsuario,
                    }
                })

                respuesta = { tipo: 'hecho', msg: 'Datos Privados Cambiados' }
            })
            .catch( error => { console.log(error) })
    }

    return respuesta
})