import { useSignalEffect } from '@preact/signals';
import { createContext, render } from 'preact';

import { useContext, useEffect, useState } from 'preact/hooks';
import './style.css';

export const Countries = createContext(null);

async function getCountries() {
	const res = await fetch('https://flags-be:1234/countries');
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error(`Failed to fetch countries. Upstream response status: ${res.status}`);
	}
}

function Flag({ svg }) {
	const [correct, setCorrect] = useState(false);
	const { countries } = useContext(Countries);

	function onGuessInput(e) {
		const guess = e.target.value;
		setCorrect(
			countries.findIndex(country => {
				country.name.en.findIndex(name => 
					name === guess.toLowerCase()
				) !== -1;
			}) !== -1
		);
	}

	return (
		<div className={`flag ${correct ? 'correct' : ''}`}>
			<img src={`data:image/svg+xml;base64,${svg}`} />
			<input type="text" onInput={onGuessInput} />
		</div>
	);
}

export function App() {
	const [countries, setCountries] = useState([]);

	useSignalEffect(() => console.log('countries', countries));

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
		<Countries.Provider value={{ countries, setCountries }}>
			<div id="app">
				{countries.map(country => <Flag svg={country.flag} /> )}
			</div>
		</Countries.Provider>
	);
}

render(<App />, document.getElementById('app'));
