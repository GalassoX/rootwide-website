import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../api/auth';

const PanelAdmin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
            return;
        }
    })
    return (
        <div className='background'>
            <p style={{ padding: "15px" }}>En desarollo...</p>
        </div>
    )
}

export default PanelAdmin;