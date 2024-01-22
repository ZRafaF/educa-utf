// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { Url } from 'next/dist/shared/lib/router/router';
import NextLink from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface LinkItemProps {
	tooltip?: string;
	title?: string;
	href?: Url;
	icon?: ReactNode;
	disabled?: boolean;
}

const LinkItem: FunctionComponent<LinkItemProps> = ({
	tooltip,
	title,
	href = '/',
	icon,
	disabled,
}) => {
	return (
		<li>
			<Tooltip
				title={
					<span style={{ whiteSpace: 'pre-line' }}>{tooltip}</span>
				}
				arrow
				placement="right"
			>
				<Box>
					<NextLink
						href={href}
						style={{
							textDecoration: 'none',
							color: 'inherit',
							pointerEvents: disabled ? 'none' : 'auto',
						}}
					>
						<ListItemButton disabled={disabled}>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText
								primary={title}
								sx={{
									ml: -1.5,
								}}
							/>
						</ListItemButton>
					</NextLink>
				</Box>
			</Tooltip>
		</li>
	);
};

export default LinkItem;
