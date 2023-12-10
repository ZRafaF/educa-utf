// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import useOverridePlugins from '@/hooks/useOverridePlugins';

interface MdRendererAsyncProps {
	article: string;
}

// DEPRECATED
const MdRendererAsync: FunctionComponent<MdRendererAsyncProps> = async ({
	article,
}) => {
	const [pluginsOverrides] = useOverridePlugins();

	return (
		<Markdown
			options={{
				overrides: pluginsOverrides,
			}}
		>
			{article}
		</Markdown>
	);
};

export default MdRendererAsync;
