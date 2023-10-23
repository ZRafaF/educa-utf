// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { FunctionComponent } from 'react';
import EditUserInfoSender from './EditUserInfoSender';
import EditUserInfoContent from './EditUserInfoContent';

interface EditUserInfoProps {}

const EditUserInfo: FunctionComponent<EditUserInfoProps> = () => {
	return (
		<EditUserInfoSender>
			<EditUserInfoContent />
		</EditUserInfoSender>
	);
};

export default EditUserInfo;
