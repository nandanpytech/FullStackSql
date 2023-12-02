export const setToken = (token) =>{
    // set token in localStorage
    localStorage.setItem('Token', token)
}

export const fetchToken = (token) =>{
    // fetch the token
    return localStorage.getItem('Token')
}
export const setEmail = (email) =>{
    // set token in localStorage
    localStorage.setItem('Email', email)
}