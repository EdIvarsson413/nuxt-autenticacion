export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('jwt').value

    // Si el token esta vacio, se queaa el layout normal
    if( !token )
        setPageLayout('default');
    else {
        const usuario = await $fetch('/api/usuarios/perfil', {
            headers: {
                Authorization:  `Bearer ${token}`,
                "client-platform": "browser"
            },
            method: "get",
        })
        
        if( usuario.tipo === 'hecho' )
            setPageLayout( 'custom' );
    }
})