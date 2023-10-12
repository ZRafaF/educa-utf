// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
}

const LinkItem: FunctionComponent<LinkItemProps> = ({
	tooltip,
	title,
	href = '/',
	icon,
}) => {
	return (
		<li>
			<NextLink
				href={href}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<Tooltip title={tooltip} arrow placement="right">
					<ListItemButton>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={title} />
					</ListItemButton>
				</Tooltip>
			</NextLink>
		</li>
	);
};

export default LinkItem;
