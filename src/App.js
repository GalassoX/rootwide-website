
import './App.css';
import NavBar from './Components/Nav/NavBar';

import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { Samp } from './Components/SAMP/Samp';
import Vehicles from './Components/SAMP/Vehicles';
import PanelAdmin from './Components/SAMP/Admin/Panel';
import Soporte from './Components/Soporte/Soporte';
import SignOut from './Components/Auth/SignOut';
import { useState } from 'react';
import NotFound from './Components/404';
import Discord from './Components/Discord/Discord';
import VerifyDiscord from './Components/Discord/Verify';
/*import NewTicket from './Components/Soporte/NewTicket';
import ViewTicket from './Components/Soporte/ViewTicket';*/

function App() {

	const [reload, setReload] = useState(false)

	return (
		<>
			<NavBar reload={reload} setReload={setReload} />
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='' element={<Home />} />
					<Route path='/register' element={<Register reload={setReload} />} />
					<Route path='/signout' element={<SignOut reload={setReload} />} />
					<Route path='/login' element={<Login reload={setReload} />} />
					<Route path='/samp' element={<Samp />} />
					<Route path='/samp/vehicles' element={<Vehicles />} />
					<Route path='/samp/admin' element={<PanelAdmin />} />
					<Route path='/soporte' element={<Soporte />} />
					<Route path='/discord' element={<Discord />} />
					<Route path='/discord/verify' element={<VerifyDiscord />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
/*
					<Route path='/soporte' element={<Navigate replace to='https://foro.rootwide.com/forumdisplay.php?fid=8' />} />
					<Route path='/soporte' element={<Soporte />} />
					<Route path='/soporte/new' element={<NewTicket />} />
					<Route path='/soporte/view' element={<ViewTicket />} />*/