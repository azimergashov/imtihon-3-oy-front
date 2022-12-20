import { useAuth } from "../hook/useAuth.js"
import {Routes, Route}  from 'react-router-dom'
// import { AdminPage } from "./adminPage.js"
import { Login } from "./login.js"
import { Bank } from "../components/bank/bank.js"
// import { Companies } from "../components/companies/companies.js"
import { Companies } from "../components/companies/companies.js"
import { Credites } from "../components/credites/credites.js"
import { Regions } from "../components/regions/regions.js"
import { Homes } from "../components/homes/homes.js"
import { AdminPage } from "./adminPage.js"

export const PrivatePage = () => {
    const {token} = useAuth()

    return(<>
    <Routes>
        <Route path="/"  element={ token ? <AdminPage/> : <Login/>}>
            <Route path="/" element={<Companies/>}/>
            <Route path="/bank" element={<Bank/>}/>
            <Route path="/credites" element={<Credites/>}/>
            <Route path="/regions" element={<Regions/>}/>
            <Route path="/homes" element={<Homes/>}/>
        </Route>
    </Routes>
    </>)
}