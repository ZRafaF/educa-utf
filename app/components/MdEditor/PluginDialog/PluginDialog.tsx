// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import PluginsArray from '@/plugins/PluginsArray';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface PluginDialogProps {
	currentPluginKey: string | undefined;
	setCurrentPluginKey: Dispatch<SetStateAction<string | undefined>>;
}

const PluginDialog: FunctionComponent<PluginDialogProps> = ({
	currentPluginKey,
	setCurrentPluginKey,
}) => {
	const open = useMemo(
		() => currentPluginKey !== undefined,
		[currentPluginKey]
	);
	const returnFunction = (componentRawString: string | undefined) => {
		alert(componentRawString);
	};

	const currentPlugin = useMemo(() => {
		return PluginsArray.find((plugin) => plugin.key === currentPluginKey);
	}, [currentPluginKey]);

	const handleClose = () => {
		setCurrentPluginKey(undefined);
	};

	if (!currentPlugin) return <></>;

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle mr={5}>{currentPlugin.title}</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>

			<DialogContent dividers>
				{<currentPlugin.editor returnFunction={returnFunction} />}
			</DialogContent>
		</Dialog>
	);
};

export default PluginDialog;
