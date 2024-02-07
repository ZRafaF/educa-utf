// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Divider from '@mui/material/Divider';
import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

const UserContentExplorer = dynamic(() => import('./UserContentExplorer'), {
	ssr: false,
});

interface UserContentProfileProps {
	username: string;
}

const UserContentProfile: FunctionComponent<UserContentProfileProps> = ({
	username,
}) => {
	return (
		<>
			<UserContentExplorer
				direction="row"
				type="chapters"
				username={username}
			/>
			<Divider sx={{ my: 4 }} variant="middle" />
			<UserContentExplorer
				direction="column"
				type="articles"
				username={username}
			/>
		</>
	);
};

export default UserContentProfile;
