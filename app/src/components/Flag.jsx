import { useState } from 'preact/hooks';

export default function Flag({ country }) {
	const [countryNameCorrect, setCountryNameCorrect] = useState(false);
	const [countryCapitalCorrect, setCountryCapitalCorrect] = useState(false);
	const [countryName, setCountryName] = useState('');
	const [countryCapital, setCountryCapital] = useState('');

	function onCountryNameGuessInput(e) {
		const guess = e.target.value;
		const countryNameIdx = country.meta.name.en.findIndex(name => 
			name.toLowerCase() === guess.toLowerCase()
		);
		setCountryNameCorrect(countryNameIdx !== -1);
		setCountryName(country.meta.name.en[countryNameIdx]);
	}

	function onCountryCapitalGuessInput(e) {
		const guess = e.target.value;
		const countryCapitalIdx = country.meta.capital.en.findIndex(name => 
			name.toLowerCase() === guess.toLowerCase()
		);
		setCountryCapitalCorrect(countryCapitalIdx !== -1);
		setCountryCapital(country.meta.capital.en[countryCapitalIdx]);
	}

    function dynamicClasses() {
        return countryNameCorrect && countryCapitalCorrect ? 
			   'bg-success-subtle border-success' : 
			   '';
    }

	function countryNameInputOutput() {
		return !countryNameCorrect ? 
				<input type="text" 
					   placeholder="Which country owns this flag?" 
					   onInput={onCountryNameGuessInput} 
					   className="col-12 border-0 p-2 text-center bg-transparent" 
				/>: 
			   <h4 className="text-center">{countryName}</h4>;
	}

	function countryCapitalInputOutput() {
		return !countryCapitalCorrect ? 
				<input type="text" 
					   placeholder="What's the flag owners's capital?" 
					   onInput={onCountryCapitalGuessInput} 
					   className="col-12 border-0 p-2 text-center bg-transparent" 
				/>: 
			   <h4 className="text-center">{countryCapital}</h4>;
	}

	return (
		<div className={`border border-3 rounded p-3 pb-0 ` +
                        `position-relative flag ${dynamicClasses()}`}>
			<div className="row justify-content-center svg">
				<img src={`data:image/svg+xml;base64,${country.flag}`} className="col-10" />
			</div>
			<div className="row col-12 bottom-0 start-0 ms-0 input">
				{countryNameInputOutput()}
				{countryCapitalInputOutput()}
			</div>
		</div>
	);
}