// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

import EditMetadataSender from './EditMetadataSender';
import EditMetadataContent from './EditMetadataContent';

interface EditMetadataProps {}

const EditMetadata: FunctionComponent<EditMetadataProps> = () => {
	return (
		<EditMetadataSender>
			<EditMetadataContent sendButton />
		</EditMetadataSender>
	);
};

export default EditMetadata;
