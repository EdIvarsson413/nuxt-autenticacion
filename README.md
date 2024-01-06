# Autenticación App
Esta práctica con Nuxt 3 es sobre la autenticación de forma local en la aplicación.

+ ## Funciones del servidor
    - Registro de usuarios, también se determina el rol de usuario (usuario o administrador).
    - Verificación de cuenta, envio de correos desde una cuenta Gmail para mandar correos reales a los usuarios que se registran.
    - Inicio de Sesion
    - Contraseña Olvidada
    - Cambio de datos privados
    - Proteccion de rutas (`perfil/`)

+ ## Tecnlogías
    - Pinia
    - Prisma ORM
    - Nuxt Mailer
    - TailwindCSS
    - JsonWebtoken
    - Bcrypt

+ ## Páginas (Cliente)
    - `/`
    - `/login`
    - `/registro`
    - `/confirmar/:token`
    - `/perfil/:uuid`
    - `/contrasena-olvidada/:token`
    - `/contrasena-olvidada/recuperar`

+ ## Pinia (Sólo son funciones)
    - `registarse`: Realiza el proceso de registro de un usuario.
    - `iniciarSesion`: Inicia sesión de un usuario con su correo y contraseña.
    - `perfil`: Obtiene y devuelve el perfil del usuario autenticado.
    - `confirmar`: Confirma la autenticidad de un usuario con un token de confirmación.
    - `enviarCorreo`: Envía un correo para recuperar la cuenta en caso de olvido.
    - `nuevaContraseña`: Actualiza la contraseña de la cuenta utilizando un token de recuperación.
    - `datos`: Obtiene y devuelve información sobre un usuario específico.
    - `cambiarDatos`: Modifica los datos del usuario autenticado.
    - `cerrarSesion`: Cierra la sesión del usuario actual.

+ ## .env
    - `FRONTEND`
    - `DATABASE_URL
    
    Variable que usa Prisma para conectar a la base de datos (MySQL)
    - `CONTRASENIA_ADMIN` 
    
    Contraseña que se concatena a la contraseña de usuario administrador para obtener el rol de ADMIN
    + Para enviar correos via Gmail
        - `CORREO`
        - `CONTRASENIA_CORREO`

        Contraseña que debe proporcionar Google para aplicaciones de terceros (Obtenida de la seccion Verificacion de 2 pasos)
        - `USUARIO`

        Nombre de usuario en Gmail

    - `JWT_FIRMA`

    Secret Key para decodificar el jsonwebtoken