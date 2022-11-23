import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../../api/auth';
import { API_URL } from '../../api/data';
import { getVehicleInfo } from '../../data/samp-vehicles';
import Loading from '../Messages/Loading';
import SampNav from './SampNav';

const Vehicles = () => {
    const [userData, setUserData] = useState({});
    const [vehicleData, setVehicleData] = useState();
    const [vehicleDataInfo, setVehicleDataInfo] = useState({});
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
                setUserData(res.data);
            })
            .catch((error) => {
                clearToken();
                navigate('/login');
            });

        axios.get(`${API_URL}/samp/vehicles`, {
            headers: {
                authorization: getToken()
            }
        }).then((res) => {
            setVehicleData(res.data);
            setVehicleDataInfo(getVehicleInfo(res.data.model));
        }).catch((err) => {
            setVehicleData(err.response.data.es);
        });
    }, []);

    if (!vehicleData) {
        return <Loading>Cargando...</Loading>
    }

    return (
        <>
            <SampNav adminLevel={userData.admin} />
            {vehicleData.es ?
                <div className='background'>
                    <p style={{ padding: "15px" }}>{vehicleData.es.error}</p>
                </div>
                :
                <div className='background' style={{ padding: '1.5em' }}>
                    <div className="panel veh-info">
                        <img src={`https://assets.open.mp/assets//images/vehiclePictures/Vehicle_${vehicleData.model}.jpg`} alt={vehicleDataInfo.name} className='border-round' />
                        <div className='veh-data'>
                            <p className='title'>{vehicleDataInfo.name} - (UID: {vehicleData.sqlid})</p>
                            <hr />
                            <p>Caduca en: {Math.floor(vehicleData.time / 24)} días y {Math.floor(vehicleData.time % 24)} horas</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Vehicles;