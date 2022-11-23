import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../api/auth';
import { API_URL } from '../../api/data';
import Error from '../Messages/Error';

const NewTicket = () => {

    const [error, setError] = useState([]);
    const [data, setData] = useState({ title: '', message: '' });

    const navigate = useNavigate();

    const onChangeInput = (e, propName) => {
        setData({ ...data, [propName]: e.target.value });
    }

    const createNewTicket = (e) => {
        e.preventDefault();
        let errors = [];
        if (data.title.length <= 1) {
            errors.push('Titulo inválido');
        }
        if (data.message.length <= 1) {
            errors.push('Mensaje inválido');
        }
        if (errors.length > 0) {
            setError(errors);
            return;
        }
        fetch(`${API_URL}/soporte/new`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                authorization: getToken()
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (!res.es) {
                    navigate(`/soporte/view?tid=${res.ticketid}`);
                } else {
                    setError(res.es);
                }
            })
            .catch(res => {
                console.error(res);
            })
    }

    return (
        <div className='background text-center center-item'>
            {error.map((error, i) => <Error key={i}>{error}</Error>)}
            <h1>Crear ticket</h1>
            <form onSubmit={createNewTicket}>
                <div className='margin-3'>
                    <input type="text" name='title' placeholder='Ingresa el título del ticket aquí' className='input' onChange={(e) => onChangeInput(e, 'title')} />
                </div>
                <div className='margin-3'>
                    <textarea type="text" name='message' placeholder='Texto' className='input' onChange={(e) => onChangeInput(e, 'message')} />
                </div>
                <div className='margin-3'>
                    <button type='submit' className='btn btn-success'>Crear ticket!</button>
                </div>
            </form>
        </div>
    )
}

export default NewTicket;