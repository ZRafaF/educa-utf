import { FunctionComponent } from 'react';

interface UpperMakerProps {
	text: string;
}

const UpperMaker: FunctionComponent<UpperMakerProps> = ({ text }) => {
	// Checa se o texto é uma string
	if (typeof text !== 'string') {
		return (
			<div>
				<p>Texto inválido</p>
			</div>
		);
	}
	// Converte o texto para maiúsculas
	const upperText = text.toUpperCase();

	return (
		<div>
			<p>{upperText}</p>
		</div>
	);
};

export default UpperMaker;
