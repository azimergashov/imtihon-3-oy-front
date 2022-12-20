import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const localToken = JSON.parse(window.localStorage.getItem('access_token'))

    const [token, setToken] = useState(localToken || '')

    useEffect(() => {
        if(token){
           return window.localStorage.setItem('access_token', JSON.stringify(token))
        }else{
           return window.localStorage.removeItem('access_token')
        }
    }, [token])

    return(<AuthContext.Provider value={{token, setToken }}>{children}</AuthContext.Provider>)
}