'use client';

import { FunctionComponent, useMemo } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import Button from '@mui/material/Button';
import RadialSelector from './RadialSelector';

const RadialSelectorEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	const options = ['asd', 'asda', 'ABC123'];

	const optionsString = options.join('~,~');

	return (
		<Button
			onClick={() => {
				returnFunction(
					<RadialSelector options={optionsString} answerIdx={2} />
				);
			}}
		>
			click
		</Button>
	);
};

export default RadialSelectorEditor;
