// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';

interface EquationProps {
	latex?: string;
}

const Equation: FunctionComponent<EquationProps> = ({ latex }) => {
	addStyles();

	return <StaticMathField>{latex}</StaticMathField>;
};

export default Equation;
