import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../api/data';
import Loading from '../Messages/Loading';
import Error from '../Messages/Error';
import './Discord.css';
import { getToken } from '../../api/auth';
import Success from '../Messages/Success';

const VerifyDiscord = () => {

    const [discordid, setDiscordid] = useState('');
    const [discordInfo, setDiscordInfo] = useState({});
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
            return;
        }

        const params = new URLSearchParams(window.location.search);
        console.log(params.get('discordid'));
        const discordid = params.get('discordid');
        setDiscordid(discordid);

        fetch(`${API_URL}/discordinfo/${discordid}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setDiscordInfo(res);
                setFetched(true);
            })
    }, [null]);

    if (!fetched) {
        return <Loading>Cargando...</Loading>
    }

    const verify = async () => {
        try {
            axios.post(`${API_URL}/discord/sync`, {
                discordid: discordid
            }, {
                headers: {
                    authorization: `${getToken()}`
                }
            }).then(res => {
                if (res.status === 200) {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/samp');
                    }, 2000)
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className='background text-center center-item'>
            {success &&
                <Success>Cuenta vinculada correctamente!</Success>
            }
            {error.length > 0 &&
                <Error>{error}</Error>
            }
            <div className='discord__card'>
                {discordInfo.avatar ?
                    <img src={`https://cdn.discordapp.com/avatars/${discordid}/${discordInfo.avatar}.png`} alt="Discord Avatar" className='discord__img_avatar' />
                    :
                    <></>
                }
                <div className='discord__card_info'>
                    <p><b>Nombre de Usuario:</b> {discordInfo.username}#{discordInfo.discriminator}</p>
                    <br />
                    <p><b>ID de Discord:</b> {discordid}</p>
                </div>
            </div>
            <div className='discord__confirm'>
                <p>¿Esa es tu cuenta?</p>
                <button className='btn btn-accept' onClick={verify}>Confirmo</button>
            </div>
        </div>
    )
}

export default VerifyDiscord;