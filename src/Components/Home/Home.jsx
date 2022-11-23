import { Link } from 'react-router-dom';

import './Home.css'

const Home = () => {
    return (
        <>
            <div className='part'>
                <div className='how-to-play'>
                    <img src={process.env.PUBLIC_URL + '/images/Girl.png'} className='img-flip' alt='Girl' />
                    <div className='htp-txt box-shadow'>
                        <p className='text-welcome text-center'>Bienvenid@ a Rootwide</p>
                        <p className='text-welcome text-center'>La comunidad pensada y hecha para que disfrutes ❤️</p>
                        <div className='text-center play-now-space'>
                            <Link to='/register' className='btn btn-accept text-white play-now'>Vamos a jugar!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home