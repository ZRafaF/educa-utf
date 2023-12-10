// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useRef, useState } from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';

import './EquationEditor.css';
import { PluginEditorProps } from '../PluginsTypes';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

const EquationEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	addStyles();
	const [latex, setLatex] = useState('\\frac{x}{2}=4');

	const handleFinish = () => {
		returnFunction(`<Equation latex="${latex}" />`);
	};

	return (
		<Stack spacing={3}>
			<Stack spacing={0}>
				<FormLabel id="demo-radio-buttons-group-label">
					Equação:
				</FormLabel>
				<EditableMathField
					latex={latex}
					onChange={(mathField) => {
						setLatex(mathField.latex());
					}}
					mathquillDidMount={(mathField) => {
						mathField.focus();
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault(); // Prevent default behavior (e.g., newline in the textarea)
							handleFinish();
						}
					}}
					style={{
						minHeight: '40px',
					}}
				/>
			</Stack>
			<TextField
				id="outlined-basic"
				label="LaTeX"
				variant="outlined"
				helperText="Equação em LaTeX"
				fullWidth
				autoComplete="equation-latex"
				value={latex}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setLatex(event.target.value);
				}}
			/>

			<Button
				variant="contained"
				onClick={() => {
					handleFinish();
				}}
			>
				Confirmar
			</Button>
		</Stack>
	);
};

export default EquationEditor;
