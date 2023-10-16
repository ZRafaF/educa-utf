// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

interface CollapsibleListProps {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}

const CollapsibleList: FunctionComponent<CollapsibleListProps> = ({
	icon,
	title,
	children,
}) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={title} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse
				in={open}
				timeout="auto"
				sx={{
					bgcolor: 'background.default',
					// boxShadow: 'inset 0px 0px 4px #000',
				}}
				unmountOnExit
			>
				<Box
					sx={{
						bgcolor: 'background.default',
						boxShadow: 'inset 0px 0px 4px 1px rgba(0, 0, 0, 0.50)',
					}}
				>
					{children}
				</Box>
			</Collapse>
		</>
	);
};

export default CollapsibleList;
