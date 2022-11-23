//import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
/*import { setToken } from '../../api/auth';
import { API_URL } from '../../api/data';
import Error from '../Messages/Error';*/

import './Auth.css'

const Register = ({ reload }) => {
    const navigate = useNavigate();

    useEffect(() => {

        const token = window.localStorage.getItem('token');
        if (token) {
            navigate('/samp');
        }
        else navigate('/login');

    })
    return null;
    /*const [data, setData] = useState({
        data: {
            username: '',
            email: '',
            password: '',
            c_password: ''
        },
        errors: [],
    });
    const [disableBtn, setDisableBtn] = useState(false);


    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            navigate('/samp');
        }
    })

    const handleRegisterInput = (e, propName) => {
        setData({
            ...data,
            [propName]: e.target.value
        });
    }

    const emailValid = (email) => {
        if (!email) return false;
        return email.toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    const usernameValid = (username) => {
        if (!username) return false;
        return !username.includes(' ') && username.length > 3 && !username.includes('#') && !username.includes('%');
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault();
        setDisableBtn(true);
        let error = [];
        setData({ ...data, errors: [] });

        const { username, email, password, c_password } = data;

        if (!usernameValid(username)) {
            error.push('Ese nombre de usuario no es válido');
        }
        if (!emailValid(email)) {
            error.push('El correo electronico no es válido.');
        }
        if (!password) {
            error.push('Tienes que introducir una contraseña.');
        } else if (password !== c_password) {
            error.push('Las contraseñas no coinciden');
        }
        if (error.length > 0) {
            setDisableBtn(false);
            setData({ ...data, errors: error });
            return;
        }

        axios.post(`${API_URL}/signup`, data)
            .then((res) => {
                setToken(res.data.token);
                reload(true);
                navigate('/samp');
            })
            .catch((error) => {
                setData({ ...data, errors: error.response.data.es.errors });
                setDisableBtn(false);
            })
    }
    return (
        <div className='background center-item'>
            {data.errors.map((error, i) => <Error key={i}>{error}</Error>)}
            <div className='panel text-center box-shadow'>
                <div className='panel-header'>
                    <p className='panel-title text-center'>REGISTRO</p>
                </div>
                <div className='panel-content'>
                    <form onSubmit={onRegisterSubmit}>
                        <div className='margin-3'>
                            <input type="text" name='username' placeholder='Nombre de Usuario' id='username' className='input' onChange={(e) => handleRegisterInput(e, 'username')} />
                        </div>
                        <div className='margin-3'>
                            <input type="email" name="email" placeholder="Correo electronico" id='email' className='input' onChange={(e) => handleRegisterInput(e, 'email')} />
                        </div>
                        <div className='margin-3'>
                            <input type="password" name="password" placeholder="Contraseña" id='password' className='input' onChange={(e) => handleRegisterInput(e, 'password')} />
                        </div>
                        <div className='margin-3'>
                            <input type="password" name="c_password" placeholder="Comfirmar contraseña" id='c_password' className='input' onChange={(e) => handleRegisterInput(e, 'c_password')} />
                        </div>
                        <div className='margin-3'>
                            <button type='submit' className='btn btn-accept' disabled={disableBtn}>Registrame</button>
                        </div>
                    </form>
                    <div className='margin-3'>
                        <Link to='/login' className='no-deco c-title'>
                            <p>¿Ya tienes una cuenta?</p>
                            <p>Logueate!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )*/
}

export default Register;