import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../api/data';
import Error from '../Messages/Error';

const Login = ({ reload }) => {

    const [data, setData] = useState({});
    const [disableBtn, setDisableBtn] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            navigate('/samp');
        }
    });

    const handleLoginInput = (e, propName) => {
        setData({
            ...data,
            [propName]: e.target.value
        });
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        axios.post(`${API_URL}/login`, data)
            .then((response) => {
                window.localStorage.setItem('token', response.data.token);
                reload(true);
                navigate('/samp');
            })
            .catch((error) => {
                setError(error.response.data.es.error);
                setDisableBtn(false);
            })
    }

    return (
        <div className='background center-item'>
            {
                error.length > 0 &&
                <Error>{error}</Error>
            }
            <div className='panel text-center box-shadow'>
                <div className='panel-header'>
                    <p className='panel-title text-center'>INGRESAR</p>
                </div>
                <div className='panel-content'>
                    <form onSubmit={onLoginSubmit}>
                        <div className='margin-3'>
                            <input type="text" name='userOrEmail' placeholder='Usuario o Correo Electronico' id='user' className='input' onChange={(e) => handleLoginInput(e, 'userOrEmail')} />
                        </div>
                        <div className='margin-3'>
                            <input type="password" name="password" placeholder="Contraseña" id='password' className='input' onChange={(e) => handleLoginInput(e, 'password')} />
                        </div>
                        <div className='margin-3'>
                            <button type='submit' className='btn btn-success' disabled={disableBtn}>Ingresar!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login;
/*<div className='margin-3'>
    <Link to='/register' className='no-deco c-title'>
        <p>¿No tienes cuenta?</p>
        <p>Crea una aquí!</p>
    </Link>
</div>*/