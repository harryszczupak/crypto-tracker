import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/index';
function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/about'
					element={
						<div className='p-4'>
							<h1 className='text-3xl font-bold'>About Page</h1>
							<p className='mt-2'>
								This is the about page of the crypto tracker app.
							</p>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
