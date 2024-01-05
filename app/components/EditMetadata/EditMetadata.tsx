// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

import EditMetadataSender from './EditMetadataSender';
import EditMetadataContent from './EditMetadataContent';
import ArticleCoverProvider from '@/contexts/ArticleCoverContext';

interface EditMetadataProps {}

const EditMetadata: FunctionComponent<EditMetadataProps> = () => {
	return (
		<ArticleCoverProvider>
			<EditMetadataSender>
				<EditMetadataContent sendButton />
			</EditMetadataSender>
		</ArticleCoverProvider>
	);
};

export default EditMetadata;
