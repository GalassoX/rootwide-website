
import { Link } from 'react-router-dom';

import { faCar, faHammer, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Samp.css'
const SampNav = ({ adminLevel }) => {

    return (
        <div className='samp-nav'>
            <div className='list-samp-nav'>
                <Link to='/samp'>
                    <li>
                        <FontAwesomeIcon icon={faUser} />
                        Info
                    </li>
                </Link>
            </div>
            <div className='list-samp-nav'>
                <Link to='/samp/vehicles'>
                    <li>
                        <FontAwesomeIcon icon={faCar} />
                        Vehículos
                    </li>
                </Link>
            </div>
            {adminLevel >= 6 ?
                <div className='list-samp-nav'>
                    <Link to='/samp/admin'>
                        <li>
                            <FontAwesomeIcon icon={faHammer} />
                            Panel Admin
                        </li>
                    </Link>
                </div>
                : <></>
            }
        </div>
    )
}

export default SampNav;