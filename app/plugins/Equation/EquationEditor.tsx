// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useState } from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';

import './EquationEditor.css';
import { PluginEditorProps } from '../PluginsTypes';

const EquationEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	addStyles();
	const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2');

	return (
		<div>
			<EditableMathField
				latex={latex}
				onChange={(mathField) => {
					setLatex(mathField.latex());
				}}
			/>
			<p>{latex}</p>
			<button
				onClick={() => {
					returnFunction('<Equation>' + latex + '</Equation>');
				}}
			>
				Confirmar
			</button>
		</div>
	);
};

export default EquationEditor;
