import { useMailer } from '#mailer'

const mailer = useMailer();
const config = useRuntimeConfig();

export default async ( correo: string, nombreUsuario: string, token: string, bandera: string ) => {
    // Definir config de correos 
    const transporter = mailer.customTransporter({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config.CORREO,
            pass: config.CONTRASENIA_CORREO
        }
    })

    // Determinar que mensaje enviar
    let cuerpo = { subject: '', text: '', html: '' };
    if( bandera === 'confirmar' ) {
        cuerpo = {
            subject: 'Confirmar Cuenta',
            text: 'Confirma tu cuenta',
            html: `
                <p>Hola, ${nombreUsuario}. Comprueba tu cuenta en Autenticacion App</p>
                <p>Tu cuenta ya está casi lista, solo debes comprobar en el siguiente enlace:</p>
                <a href="${config.FRONTEND}/confirmar/${token}">Comprobar cuenta</a>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
        }
    } 

    if( bandera === 'recuperar' ) {
        cuerpo = {
            subject: 'Recuperar Cuenta',
            text: 'Recupera tu cuenta',
            html: `
                <p>Hola, ${nombreUsuario}. Al parecer olvidaste tu contraseña, te damos estas instrucciones</p>
                <p>1. Ingresa a este enlace:</p>
                <a href="${config.FRONTEND}/contrasena-olvidada/${token}">Recuperar cuenta</a>
                <p>2. Da una nueva contraseña (de preferencia) y vuelve a iniciar sesión</p>
                <p>Si no has pedido esto, ignora este correo</p>
            `
        }
    }

    // Enviar correo comprobar cuenta
    await mailer.sendMail({
        transporter: transporter,
        requestId: 'id-unico',
        options: {
            fromEmail: config.CORREO,
            fromName: config.USUARIO,
            to: correo,
            subject: cuerpo.subject,
            text: cuerpo.text,
            html: cuerpo.html
        }
    })
        .then( info => {
            console.log('Correo enviado')
        })
        .catch( error => {
            console.log(error)
        })
}  