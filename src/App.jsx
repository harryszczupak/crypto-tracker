import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/index';
import Detail from './pages/detail-page';
function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:id' element={<Detail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
