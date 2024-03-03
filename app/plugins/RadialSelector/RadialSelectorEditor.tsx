'use client';

import { FunctionComponent, useMemo } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import Button from '@mui/material/Button';

const RadialSelectorEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	const optionsString = useMemo(() => {
		return JSON.stringify({
			text: 'asd',
			answer: 'asd',
		});
	}, []);

	return (
		<Button
			onClick={() => {
				returnFunction(
					`<RadialSelector options='${optionsString}'/>\n`
				);
			}}
		>
			click
		</Button>
	);
};

export default RadialSelectorEditor;
