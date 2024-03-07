// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useMemo,
} from 'react';
import PluginsArray from '@/plugins/PluginsArray';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ArticlesResponse } from '@/types/pocketbase-types';

interface PluginDialogProps {
	currentPluginKey: string | undefined;
	setCurrentPluginKey: Dispatch<SetStateAction<string | undefined>>;
	returnFunction: (component: ReactNode) => void;
	article: ArticlesResponse;
}

const PluginDialog: FunctionComponent<PluginDialogProps> = ({
	currentPluginKey,
	setCurrentPluginKey,
	returnFunction,
	article,
}) => {
	const open = useMemo(
		() => currentPluginKey !== undefined,
		[currentPluginKey]
	);

	const currentPlugin = useMemo(() => {
		return PluginsArray.find((plugin) => plugin.key === currentPluginKey);
	}, [currentPluginKey]);

	const handleClose = () => {
		setCurrentPluginKey(undefined);
	};

	const handleReturnFunction = (component: ReactNode) => {
		returnFunction(component);
		handleClose();
	};

	if (!currentPlugin) return <></>;

	return (
		<Dialog onClose={handleClose} open={open} maxWidth={'md'}>
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
				{
					<currentPlugin.editor
						returnFunction={handleReturnFunction}
						article={article}
					/>
				}
			</DialogContent>
		</Dialog>
	);
};

export default PluginDialog;
