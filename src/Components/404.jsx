import React from 'react'
import { Link } from 'react-router-dom';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
    return (
        <div className='background center-item text-center'>
            <h1>Oops, 404 <FontAwesomeIcon icon={faFaceFrown} /></h1>
            <h3>La ruta que buscas no existe o no se encuentra disponible</h3>
            <Link to='/'>Volver al inicio</Link>
        </div>
    )
}

export default NotFound;