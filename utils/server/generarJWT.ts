import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

export default ( uuid: string, rol: string ) => {
    return jwt.sign(
        { uuid, rol }, // Informacion a cambio de la autenticacion 
        config.JWT_FIRMA, // Firma del JWT
        { expiresIn: '30d' } // Tiempo para que el token caduque (30 dias)
    ); 
}