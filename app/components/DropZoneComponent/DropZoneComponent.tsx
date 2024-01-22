// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Box from '@mui/material/Box/Box';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import Image from 'next/image';
import {
	CSSProperties,
	FunctionComponent,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack/Stack';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { ArticleCoverContext } from '@/contexts/ArticleCoverContext';
import Fab from '@mui/material/Fab';

const contentWidth = 300;
const contentHeight = 150;

const baseStyle: CSSProperties = {
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	flexGrow: 2,
	paddingRight: 10,
	cursor: 'pointer',
};

const focusedStyle: CSSProperties = {
	borderColor: '#2196f3',
};

const acceptStyle: CSSProperties = {
	borderColor: '#00e676',
};

const rejectStyle: CSSProperties = {
	borderColor: '#ff1744',
};

interface DropZoneComponentProps {}

const DropZoneComponent: FunctionComponent<DropZoneComponentProps> = () => {
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	const [selectedFile, setSelectedFile] = useContext(ArticleCoverContext);
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setSelectedFile(acceptedFiles[0]);
		},
		[setSelectedFile]
	);
	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'image/gif': [],
			'image/svg': [],
			'image/webp': [],
		},
		multiple: false,
		maxSize: 5242880,
		maxFiles: 1,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<Box
			sx={{
				maxWidth: contentWidth,
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<FormLabel>
					<Typography variant="body2">Imagem de capa:</Typography>
				</FormLabel>
				<ClickAwayListener onClickAway={handleTooltipClose}>
					<div>
						<Tooltip
							title="Para a melhor qualidade a imagem deve ter proporção de 2/1, recomendamos 600x300 px"
							arrow
							placement="top"
							PopperProps={{
								disablePortal: true,
							}}
							onClose={handleTooltipClose}
							open={open}
							disableFocusListener
							disableHoverListener
							disableTouchListener
						>
							<IconButton
								onClick={handleTooltipOpen}
								size="small"
							>
								<HelpIcon fontSize="inherit" color="disabled" />
							</IconButton>
						</Tooltip>
					</div>
				</ClickAwayListener>
			</Stack>
			<Box
				sx={{
					display: 'flex',
					height: contentHeight,
					width: '100%',
					position: 'relative',
				}}
			>
				{selectedFile ? (
					<Box
						sx={{
							position: 'relative',
							maxWidth: contentWidth,
							maxHeight: contentHeight,
							borderColor: 'text.disabled',
							borderStyle: 'solid',
							borderRadius: 2,
							borderWidth: 2,
							width: '100%',
							overflow: 'hidden',
						}}
					>
						<Box
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
							}}
						>
							<Image
								alt={selectedFile.name}
								src={URL.createObjectURL(selectedFile)}
								style={{
									objectFit: 'contain',
								}}
								fill
							/>
						</Box>
						<Tooltip title="Remover imagem">
							<Fab
								color="error"
								aria-label="add"
								sx={{
									position: 'absolute',
									right: 0,
									top: 0,
									height: 20,
									m: 1,
								}}
								variant="extended"
								size="small"
								onClick={() => {
									setSelectedFile(undefined);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</Fab>
						</Tooltip>
					</Box>
				) : (
					<Box
						sx={{
							':hover': {
								borderColor: 'primary.main',
							},
							transitionDuration: '100ms',
							borderRadius: 2,
							borderWidth: 2,
							borderStyle: 'dashed',
							borderColor: 'text.disabled',

							backgroundColor: 'background.default',
						}}
					>
						<div {...getRootProps({ style })}>
							<input {...getInputProps()} />
							<AttachFileIcon color="disabled" fontSize="large" />
							<Typography variant="body2" color={'GrayText'}>
								Pressione ou arraste uma imagem aqui
							</Typography>
						</div>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default DropZoneComponent;
