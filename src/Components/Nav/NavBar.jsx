import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { faBarsStaggered, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NavBar.css'
import { getToken } from '../../api/auth';

const NavBar = ({ reload, setReload }) => {

    useEffect(() => {
        setReload(false);
    }, [reload]);

    return (
        <nav className='navbar box-shadow'>
            <Link to='/'>
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} className='img-logo' alt='Logo'></img>
            </Link>
            <ul className='list list-navbar'>
                <a href='https://foro.rootwide.com'><li>Foro</li></a>
                <Link to='/soporte'><li>Soporte</li></Link>
            </ul>
            <div className='nav-register flex space-items' style={{ padding: "auto" }} >
                {typeof getToken() === 'string' ?
                    <Link to='/samp' className='btn btn-accept'>SAMP</Link>
                    :
                    <Link to='/login' className='btn btn-success'>Ingresar!</Link>
                }
                <div className='dropdown-options center-reg-bar'>
                    <FontAwesomeIcon icon={faBarsStaggered} className='icon-options img-flip' />
                    <div className="dropdown-content">
                        <Link to='/discord'>
                            Discord
                            <FontAwesomeIcon icon={faLink} className='disable' />
                        </Link>
                        {typeof getToken() === 'string' ?
                            <Link to='/signout'>Cerrar sesión</Link>
                            :
                            <></>
                        }
                    </div>
                </div>

            </div>
        </nav >
    )
}

export default NavBar;