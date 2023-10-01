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
import ArticleCoverContext from '@/contexts/ArticleCoverContext';

const contentWidth = 300;
const contentHeight = 150;

const baseStyle: CSSProperties = {
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: contentHeight,
	width: contentWidth,
	flexGrow: 2,
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
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setSelectedFile(acceptedFiles[0]);
	}, []);
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
				width: contentWidth,
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
					borderWidth: 2,
					height: contentHeight,
					width: '100%',
					position: 'relative',
				}}
			>
				{selectedFile ? (
					<Box
						sx={{
							position: 'absolute',
							width: contentWidth,
							height: contentHeight,
							borderColor: '#eeeeee',
							backgroundColor: '#fafafa',
							borderStyle: 'solid',
							borderRadius: 2,
							overflow: 'hidden',
						}}
					>
						<Image
							alt={selectedFile.name}
							src={URL.createObjectURL(selectedFile)}
							width={contentWidth}
							height={contentHeight}
							style={{ objectFit: 'contain' }}
						/>
						<IconButton
							aria-label="delete"
							size="small"
							sx={{
								position: 'absolute',
								right: 0,
							}}
							onClick={() => {
								setSelectedFile(undefined);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</Box>
				) : (
					<Box
						sx={{
							':hover': {
								borderColor: '#D6D6D6',
							},
							transitionDuration: '100ms',
							borderRadius: 2,
							borderColor: '#eeeeee',
							borderStyle: 'dashed',
							backgroundColor: '#fafafa',
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
