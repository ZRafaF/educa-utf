// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';

interface EquationProps {}

const Equation: FunctionComponent<EquationProps> = () => {
	addStyles();
	return (
		<StaticMathField>{'\\frac{1+2}{\\sqrt{2}}\\cdot 2'}</StaticMathField>
	);
};

export default Equation;
