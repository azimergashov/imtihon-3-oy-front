import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export const useAuth = () =>{
    const {token, setToken} = useContext(AuthContext)

    return {token, setToken}
}