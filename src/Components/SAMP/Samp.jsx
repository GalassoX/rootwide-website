import React, { useEffect, useState } from 'react'

import { faCar, faFish, faGun, faMotorcycle, faPlane, faShip, faTrain, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Samp.css'
import SampNav from './SampNav'
import { getSampCity } from '../../data/samp-data';
import axios from 'axios';
import { API_URL } from '../../api/data';
import { getToken } from '../../api/auth';
import CreatePJ from './CreatePJ';
import Loading from '../Messages/Loading';
import { useNavigate } from 'react-router-dom';

export const Samp = () => {

    const [userData, setUserData] = useState();
    const [jobName, setJobName] = useState('');
    const [level, setLevel] = useState(0);
    const [proxLevel, setProxLevel] = useState(0);
    const [progLevel, setProgLevel] = useState(0);
    const [pjExist, setPJExist] = useState(false);
    const [fetched, setFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
            return;
        }
        axios.get(`${API_URL}/samp`, {
            headers: {
                authorization: getToken()
            }
        })
            .then((res) => {
                setPJExist(true);
                setUserData(res.data);
                calculateLevel(res.data.hours_playing);
                calculateProxLevel(res.data.hours_playing);
                calculateProgLevel(res.data.hours_playing);
                configureJob(res.data.job);
                setFetched(true);
            })
            .catch((error) => {
                setPJExist(false);
                setFetched(true);
            })
    }, []);

    function calculateLevel(hours_playing) {
        let hoursp = hours_playing;
        let levelc = 0, count = 4;
        while (hoursp >= count) {
            hoursp -= count;
            count += 4;
            levelc++;
        }
        setLevel(levelc);
    }

    function calculateProxLevel(hours_playing) {
        let hoursp = hours_playing;
        let count = 4;
        while (hoursp >= count) {
            hoursp -= count;
            count += 4;
        }
        setProxLevel(count);
    }

    function calculateProgLevel(hours_playing) {
        let hoursp = hours_playing;
        let count = 4;
        while (hoursp >= count) {
            hoursp -= count;
            count += 4;
        }
        setProgLevel(hoursp);
    }

    function configureJob(job) {
        switch (job) {
            case 1:
                setJobName('Pescador')
                break;
            case 2:
                setJobName('Vendedor de teléfonos')
                break;
            case 3:
                setJobName('Camionero')
                break;
            default:
                setJobName('Ningúno')
                break;
        }
    }

    if (!fetched) {
        return <Loading>Cargando...</Loading>
    }

    return !pjExist ? <CreatePJ /> :
        <>
            <SampNav adminLevel={userData.admin} />
            <div className='background'>
                <div className='samp-top'>
                    <section className='avatar-space'>
                        <img src={`${process.env.PUBLIC_URL}/images/skins/${userData.skin}.png`} alt="Skin" className='avatar' />
                        <p className='text-center'>{userData.name}</p>
                    </section>
                    <section className='panel-items-text'>
                        <div className='text-center'>
                            <p className='bold c-title'>Género</p>
                            <p className='c-content'>{userData.gender === 0 ? "Hombre" : "Mujer"}</p>
                        </div>
                        <div className='text-center'>
                            <p className='bold c-title'>Teléfono</p>
                            <p className='c-content'>{userData.phone}</p>
                        </div>
                        <div className='text-center'>
                            <p className='bold c-title'>Ciudad</p>
                            <p className='c-content'>{getSampCity(userData.city)}</p>
                        </div>
                        <div className='text-center'>
                            <p className='bold c-title'>Trabajo</p>
                            <p className='c-content'>{jobName}</p>
                        </div>
                    </section>
                    <section className='panel-items'>
                        <div>
                            <div className='item-title'>Economía</div>
                            <div className='panel-items-content'>
                                <div className='item-content'>
                                    <p className='bold c-title'>Mano</p>
                                    <p className='c-content'>$ {userData.money}</p>
                                </div>
                                <div className='item-content'>
                                    <p className='bold c-title'>Banco</p>
                                    <p className='c-content'>$ {userData.bank}</p>
                                </div>
                                <div className='item-content'>
                                    <p className='bold c-title'>Cuenta bancaria</p>
                                    <p className='c-content'># {userData.bank_account}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='item-title'>Estadísticas</div>
                            <div className='panel-items-content'>
                                <div className='item-content'>
                                    <p className='bold c-title'>Nivel</p>
                                    <p className='c-content'>{level}</p>
                                </div>
                                <div className='item-content'>
                                    <p className='bold c-title'>Próximo nivel</p>
                                    <p className='c-content'>{progLevel}/{proxLevel}</p>
                                </div>
                                <div className='item-content'>
                                    <p className='bold c-title'>Horas jugadas</p>
                                    <p className='c-content'>{userData.hours_playing} horas</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='panel-items'>
                        <div>
                            <div className='item-title'>Licencias</div>
                            <div className='panel-items-content'>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faGun} className={userData.license_1 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faCar} className={userData.license_2 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faTruck} className={userData.license_3 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faMotorcycle} className={userData.license_4 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faPlane} className={userData.license_5 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faShip} className={userData.license_6 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faTrain} className={userData.license_7 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                                <div className='item-content'>
                                    <FontAwesomeIcon icon={faFish} className={userData.license_8 === 0 ? 'icon-lics disable' : 'icon-lics'} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='item-title'>Idiomas</div>
                            <div className='panel-items-content'>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/de.svg" alt="Aleman" className={userData.lang_1 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/fr.svg" alt="Frances" className={userData.lang_2 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/pt.svg" alt="Portugues" className={userData.lang_3 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/it.svg" alt="Italiano" className={userData.lang_4 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/gb.svg" alt="Ingles" className={userData.lang_5 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                                <div className='item-content'>
                                    <img src="https://raw.githubusercontent.com/lipis/flag-icons/c2c4370002d0ba573e8f7de4e65413946c4ae48f/flags/1x1/jp.svg" alt="Japones" className={userData.lang_6 === 1 ? 'lang-samp' : 'lang-samp no-dispo'} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>;
}

// <img src={`https://static.up-cdn.com/roleplay/mapa/images/skins/${userData.skin}.jpg`} alt="Skin" className='avatar' />