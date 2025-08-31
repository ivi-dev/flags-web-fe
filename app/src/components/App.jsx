import { useEffect, useState } from 'preact/hooks';
import { getCountries } from '../services/countries';
import Flag from './Flag';

export default function App() {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		async function _() {
			try {
				setCountries(await getCountries());
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		}
		_();
	}, []);

	return (
		<div id="app">
			<div className="row g-3 p-3 ps-4">
				{countries.map(country => 
					<Flag country={country} /> 
				)}
			</div>
		</div>
	);
}