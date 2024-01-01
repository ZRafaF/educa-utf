// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { FunctionComponent } from 'react';
import { usePWAInstall } from 'react-use-pwa-install';
import DownloadIcon from '@mui/icons-material/Download';
interface InstallPwaButtonProps {}

const InstallPwaButton: FunctionComponent<InstallPwaButtonProps> = () => {
	const installPwa = usePWAInstall();

	if (installPwa === null) return <></>;

	return (
		<Tooltip title={'Instalar aplicativo'} arrow placement="right">
			<ListItemButton
				onClick={() => {
					installPwa();
				}}
			>
				<ListItemIcon>
					<DownloadIcon />
				</ListItemIcon>
				<ListItemText
					primary={'Instalar APP'}
					sx={{
						ml: -1.5,
					}}
				/>
			</ListItemButton>
		</Tooltip>
	);
};

export default InstallPwaButton;
