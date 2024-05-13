export const logOut = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    localStorage.removeItem('timestamp')
    window.location.href = '/'
}
