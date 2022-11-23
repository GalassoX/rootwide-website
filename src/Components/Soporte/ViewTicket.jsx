import React, { createElement, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getToken } from '../../api/auth';
import { API_URL } from '../../api/data';
import Error from '../Messages/Error';
import Loading from '../Messages/Loading';

import './Ticket.css';

const ViewTicket = () => {
    const [ticket, setTicket] = useState({
        ticket: { id: 0, created_at: 0, created_by: 0, message: '', pid: 0, title: '', state: 0 },
        user: {},
        replys: { post: [], users: [] }
    });
    const [replyData, setReplyData] = useState({ message: '' });
    const [error, setError] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateTicket = () => {
        const post = searchParams.get('tid');
        let url = new URL(`${API_URL}/soporte/ticket`);
        url.search = new URLSearchParams({ tid: post });
        if (!post) {
            navigate('/soporte');
        }
        fetch(url, {
            headers: {
                authorization: getToken()
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setFetched(true);
                setTicket(res);
            });
    }

    useEffect(() => {
        updateTicket();
    }, []);

    const onChangeInput = (e, propName) => {
        setReplyData({ [propName]: e.target.value });
    }

    const addReplyTicket = (e) => {
        e.preventDefault();
        let errors = [];
        if (replyData.message.length <= 1) {
            errors.push('Respuesta inválido');
        }
        if (errors.length > 0) {
            setError(errors);
            return;
        }

        fetch(`${API_URL}/soporte/new`, {
            method: 'POST',
            body: JSON.stringify({
                title: `RE: ${ticket.ticket.title}`,
                message: replyData.message,
                reply: ticket.ticket.id
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: getToken()
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (!res.es) {
                    updateTicket();
                } else {
                    setError(res.es);
                }
            })
            .catch(res => {
                console.error(res);
            })
    }

    if (!fetched) {
        return <Loading>Cargando...</Loading>
    }

    const setHTMLTags = (text) => {
        if (!text) return null;
        const tags = ['b', 'br', 'hr'];
        tags.forEach(tag => {
            const firstIndex = text.indexOf(`<${tag}>`);
            if (firstIndex !== -1) {
                const secondIndex = text.indexOf(`</${tag}>`, firstIndex);
                if (secondIndex !== -1) {
                    let inner = '';
                    for (let i = firstIndex + 3; i < secondIndex; i++) {
                        inner += text[i];
                    }
                    const contentDiv = document.getElementById('ticket_content');
                    const element = document.createElement(tag);
                    element.textContent = inner;
                    contentDiv.appendChild(element);
                }
            }
        })
    }
    return (
        <>
            <div className='background ticket__body'>
                <div className='ticket-header'>
                    <h1>#{ticket.ticket.id} - {ticket.ticket.title}</h1>
                    <p className='ticket__user-info'>Creado por <i>{ticket.user.username}</i> • {new Date(ticket.ticket.created_at).toLocaleDateString()}</p>
                </div>
                <hr />
                <div className='ticket__content' id='ticket_content'>
                    {/*setHTMLTags(ticket.ticket.message)*/}
                    <p>{ticket.ticket.message}</p>
                </div>
            </div>
            {ticket.replys.post.map((reply, i) =>
                <div className='background ticket__body' key={i}>
                    <div className='ticket-header'>
                        <p className='ticket__user-info'>Respuesta de <i>{ticket.replys.users[i].username}</i> • {new Date(reply.created_at).toLocaleDateString()}</p>
                    </div>
                    <hr />
                    <div className='ticket__content'>
                        <p>{reply.message}</p>
                    </div>
                </div>
            )}
            <div className='background text-center ticket__add-reply'>
                {error.map((error, i) => <Error key={i}>{error}</Error>)}
                <h2>Añadir respuesta</h2>
                <form onSubmit={addReplyTicket}>
                    <div className='margin-3'>
                        <textarea type="text" name='message' placeholder='Texto' className='input' onChange={(e) => onChangeInput(e, 'message')} />
                    </div>
                    <div className='margin-3'>
                        <button type='submit' className='btn btn-success'>Enviar respuesta</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ViewTicket;