// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';

interface CustomButtonProps {
	alertC: string;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({ alertC }) => {
	return (
		<button
			onClick={() => {
				alert(alertC);
			}}
		>
			Eu sou um botão
		</button>
	);
};
export default CustomButton;
