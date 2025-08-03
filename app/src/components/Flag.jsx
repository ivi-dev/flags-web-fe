import { useState } from 'preact/hooks';

export default function Flag({ name, svg }) {
	const [correct, setCorrect] = useState(false);
	const [countryName, setCountryName] = useState('');

	function onGuessInput(e) {
		const guess = e.target.value;
		const countryNameIdx = name.en.findIndex(name => 
			name.toLowerCase() === guess.toLowerCase()
		);
		setCorrect(countryNameIdx !== -1);
		setCountryName(name.en[countryNameIdx]);
	}

	function countryNameInputOuput() {
		return !correct ? 
			   <input type="text" 
			   		  placeholder="Which country is this?" 
			   		  onInput={onGuessInput} 
			   		  className="col-12 border-0 p-2 text-center bg-transparent" 
			   /> : 
			   <h4 className="text-center">{countryName}</h4>;
	}

	return (
		<div className={`col-3 border border-3 rounded p-3 pb-0 me-3 position-relative flag ` +
			            `${correct ? 'bg-success-subtle border-success' : ''}`}>
			<div className="row justify-content-center svg">
				<img src={`data:image/svg+xml;base64,${svg}`} className="col-10" />
			</div>
			<div className="row col-12 position-absolute bottom-0 start-0 ms-0 input">
				{countryNameInputOuput()}
			</div>
		</div>
	);
}