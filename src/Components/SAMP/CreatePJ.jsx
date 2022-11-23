import axios from 'axios';
import React, { useState } from 'react'
import { getToken, setToken } from '../../api/auth';
import { API_URL } from '../../api/data';
import Error from '../Messages/Error';

const CreatePJ = () => {
    const [state, setState] = useState({
        data: {},
        errors: [],
        disableButton: false
    });
    const [disableButton, setDisableButton] = useState(false);

    const handleCreateInput = (e, propName) => {
        setState({
            ...state,
            data: {
                ...state.data,
                [propName]: e.target.value
            }
        });
    }

    const characterNameValid = (name) => {
        const match = name.match(/[A-Z]+?[a-z]{1,}/g);
        return match?.at(0)?.length === name.length;
    }

    const createPJSampHandler = async (e) => {
        e.preventDefault();
        setState({ ...state, errors: [] });
        const { age, character_first, character_last, gender } = state.data;
        let errorsArr = [];

        if (!age) {
            errorsArr = [...errorsArr, 'Edad inválida'];
        } else if (age < 16 || age > 80) {
            errorsArr = [...errorsArr, 'La edad tiene que estar entre 16 y 80 años'];
        }

        if (!character_first || !characterNameValid(character_first)) {
            errorsArr = [...errorsArr, 'Ese nombre no es válido'];
        }

        if (!character_last || !characterNameValid(character_first)) {
            errorsArr = [...errorsArr, 'Ese apellido no es válido'];
        }

        if (!gender || gender < 1 || gender > 2) {
            errorsArr = [...errorsArr, 'Tienes que seleccionar el género del personaje'];
        } else if (gender < 1 || gender > 2) {
            errorsArr = [...errorsArr, 'Solo hay 2 opciones de género... ¿que quieres hacer? xD'];
        }
        if (errorsArr.length > 0) {
            setState({
                ...state,
                errors: errorsArr,
            });
            return;
        }
        setDisableButton(true);
        axios.post(`${API_URL}/samp/new`, {
            "character_first": character_first,
            "character_last": character_last,
            "age": age,
            "gender": gender - 1
        }, {
            headers: {
                authorization: getToken()
            }
        }).then((res) => {
            setToken(res.data.token);
            window.location.reload();
        }).catch((error) => {
            setState({
                ...state,
                errors: error.response.data.es.errors
            })
            setDisableButton(false);
        })
    }
    return (
        <>
            <div className='background center-item'>
                {state.errors.map((err, i) => <Error key={i}>{err}</Error>)}
                <div className="panel box-shadow text-center">
                    <div className='panel-header'>
                        <p className='panel-title text-center'>CREAR PERSONAJE</p>
                    </div>
                    <form onSubmit={createPJSampHandler}>
                        <div className='margin-3'>
                            <p className='text-left text-input'>Nombre: </p>
                            <input type="text" name='character_first' placeholder='Nombre del personaje' className='input' onChange={(e) => handleCreateInput(e, 'character_first')} />
                        </div>
                        <div className='margin-3'>
                            <p className='text-left text-input'>Apellido: </p>
                            <input type="text" name='character_last' placeholder='Apellido del personaje' className='input' onChange={(e) => handleCreateInput(e, 'character_last')} />
                        </div>
                        <div className='margin-3'>
                            <p className='text-left text-input'>Edad: </p>
                            <input type="number" name='age' placeholder='Edad' className='input' onChange={(e) => handleCreateInput(e, 'age')} />
                        </div>
                        <div className='margin-3'>
                            <p className='text-left text-input'>Género: </p>
                            <select name="gender" id="" className='select' onChange={(e) => handleCreateInput(e, 'gender')}>
                                <option value="0">Seleccionar...</option>
                                <option value="1">Hombre</option>
                                <option value="2">Mujer</option>
                            </select>
                        </div>
                        <div className='margin-3'>
                            <button type='submit' className='btn btn-success' disabled={disableButton}>Crear personaje!</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePJ;