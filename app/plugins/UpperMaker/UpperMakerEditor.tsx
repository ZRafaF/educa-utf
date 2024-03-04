'use client';

import { FunctionComponent, useState } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import UpperMaker from './UpperMaker';

const UpperMakerEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	const [userInput, setUserInput] = useState<string>('');

	return (
		<>
			<input
				type="text"
				placeholder="Digite o texto aqui"
				onChange={(e) => {
					setUserInput(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					returnFunction(<UpperMaker text={userInput} />);
				}}
			>
				Enviar
			</button>
		</>
	);
};

export default UpperMakerEditor;
