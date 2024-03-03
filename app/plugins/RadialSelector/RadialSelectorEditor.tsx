'use client';

import { FunctionComponent } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import Button from '@mui/material/Button';

const RadialSelectorEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	return (
		<>
			<Button
				onClick={() => {
					returnFunction(
						`<RadialSelector options="${['asd', 'asd']}"/>`
					);
				}}
			>
				click
			</Button>
		</>
	);
};

export default RadialSelectorEditor;
