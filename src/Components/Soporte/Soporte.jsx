/*import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getToken } from '../../api/auth'
import { API_URL } from '../../api/data'*/

const Soporte = () => {
    window.location.replace('https://foro.rootwide.com/forumdisplay.php?fid=8');
    return (
        <div className='background center-item text-center'>
            <h1>Redireccionando a SOPORTE...</h1>
        </div>
    );

    /*const [data, setData] = useState([{ tickets: [{}], users: [{}] }]);

    useEffect(() => {
        fetch(`${API_URL}/soporte`, {
            method: 'GET',
            headers: {
                authorization: getToken()
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setData(response);
            })
            .catch((response) => {
                console.log(response);
            })
        window.location.assign('https://foro.rootwide.com/forumdisplay.php?fid=8');
    }, [])

    return (<></>
        <div className='background'>
            <Link to='/soporte/new' className='btn btn-success'>+ Crear ticket</Link>
            {data.tickets.length > 0 ?
                <p>Hay {data.length} temas</p>
                :
                <p>No hay tickets abiertos</p>
            }
            {data.tickets.map((ticket, i) =>
                <div key={i}>
                    <Link to={`/soporte/view?tid=${ticket.ticketid}`}>{ticket.title}</Link>
                </div>
            )}
        </div>
    )*/
}

export default Soporte;