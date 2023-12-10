// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useMemo } from 'react';
import Markdown from 'markdown-to-jsx';
import PreBlock from './PreBlock';
import PluginsArray from '@/plugins/PluginsArray';

interface MdRendererProps {
	article: string;
}

const MdRenderer: FunctionComponent<MdRendererProps> = ({ article }) => {
	const renderers: { [key: string]: FunctionComponent<any> } = useMemo(() => {
		const renderers: { [key: string]: FunctionComponent<any> } = {};
		PluginsArray.forEach((plugin) => {
			renderers[plugin.render.name] = plugin.render;
		});
		return renderers;
	}, []);

	return (
		<Markdown
			options={{
				overrides: {
					...renderers,
					pre: PreBlock,
				},
			}}
		>
			{article}
		</Markdown>
	);
};

export default MdRenderer;
