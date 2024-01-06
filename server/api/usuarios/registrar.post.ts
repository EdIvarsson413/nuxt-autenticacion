import { PrismaClient } from '@prisma/client' 
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt'
import enviarCorreo from '~/utils/server/enviarCorreo'
import type { Respuesta, UsuarioRegistro } from '~/types/tipos'

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { nombre, apellido, nombreUsuario, correo, contraseña } = await readBody <UsuarioRegistro> ( event );
    const config = useRuntimeConfig( event );
    
    let rol : string = '';
    let respuesta: Respuesta = {
        tipo: '',
        msg: '',
    }

    const usuarioExiste = await prisma.usuario.findFirst({
        where: {
            correo: correo
        }
    });

    if( usuarioExiste ) {
        respuesta = { msg: 'Usuario ya registrado', tipo: 'error' };
    } else {
        // Determinar rol
        if ( nombreUsuario.includes('Admin') && contraseña.includes( config.CONTRASENIA_ADMIN ) ) { 
            rol = 'administrador';
        } else {
            rol = 'usuario';
        }
        
        const salt = await bcrypt.genSalt( 10 );
        
        await prisma.usuario.create({
            data: {
                nombre: nombre,
                apellido: apellido,
                nombre_usuario: nombreUsuario,
                correo: correo,
                contrasenia: await bcrypt.hash( contraseña, salt ),
                rol: rol,
                token: randomUUID(),
                uuid: randomUUID()
            }
        })
        .then( response => {
            respuesta = { msg: `Usuario registrado, verifique la bandeja de su correo`, tipo: 'hecho' }

            // Enviar Correo
            enviarCorreo( response.correo, response.nombre_usuario, response.token, 'confirmar' )
        })
        .catch( error => {
            console.log(error)
        })
    }
    
    
    return {
        tipo: respuesta.tipo,
        msg: respuesta.msg
    }
})