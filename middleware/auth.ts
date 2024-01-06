export default defineNuxtRouteMiddleware( async (to, from) => {
    const token = useCookie('jwt').value;

    // Si el token esta vacio, se retorna a la ruta principal
    if( !token )
        return navigateTo('/')
})