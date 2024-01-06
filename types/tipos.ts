export interface Respuesta {
    tipo: String
    msg: String
}

export interface RespuestaLogin {
    tipo: String
    id: Number
    uuid: String
    nombreUsuario: String
    rol: String
    correo: String
    webToken: String
}

export interface Usuario {
    tipo: String
    uuid: String
    nombre: String
    apellido: String
    nombreUsuario: String
    rol: String
    correo: String
    contraseña: String
    registro: String
}

export interface UsuarioRegistro {
    nombre: string
    apellido: string
    nombreUsuario: string
    correo: string
    contraseña: string
}

export interface Perfil {
    tipo: String
    uuid: String
    rol: String
    nombreUsuario: String 
    correo: String
}

export interface Login {
    correo: string
    contraseña: string
}

export interface Registro {
    nombre: String
    apellido: String
    nombreUsuario: String
    correo: String
    contraseña: String
}