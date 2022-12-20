import { Header } from "../components/header/header.js"
import { Outlet}  from 'react-router-dom'
// import { Companies } from "../components/companies/companies.js"
// import { Bank } from "../components/bank/bank.js"
// import { Admin } from "./admin.js"


export const AdminPage = ()  =>{

    return(<>
    <div style={{minHeight: '100vh'}} className="d-flex  container " >

        <div style={{height: 'auto'}}><Header/></div>

        <div className="ms-3 w-100" style={{minHeight: '100vh'}}>
        <Outlet/>
        </div>
    </div>
    </>)
}