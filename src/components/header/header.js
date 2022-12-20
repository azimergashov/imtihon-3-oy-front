import {NavLink} from 'react-router-dom'
import './header.css'
export const Header = () =>{
    return(<header className='headerr'>
        <ul className='list-unstyled'>
            <li >
                <NavLink to='/login/' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Companies
                </NavLink>
            </li>
            <li>
                <NavLink to='/login/bank' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Banks
                </NavLink>
            </li>
            <li>
                <NavLink to='/login/credites' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Credites
                </NavLink>
            </li>
            <li>
                <NavLink to='/login/regions' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Regions
                </NavLink>
            </li>
            <li>
                <NavLink to='/login/homes' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Homes
                </NavLink>
            </li>
            <li >
                <NavLink to='/' className={({isActive}) => isActive ? "header-link-active" : "header-link"}>
                    Bosh_sahifa
                </NavLink>
            </li>

        </ul>

    </header>)
}