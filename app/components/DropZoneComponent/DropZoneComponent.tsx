// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import Image from 'next/image';
import {
	CSSProperties,
	FunctionComponent,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle: CSSProperties = {
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	flexGrow: 2,
	cursor: 'pointer',
	padding: '10px',
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
	const [selectedFile, setSelectedFile] = useState<File>();
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
				':hover': {
					outlineWidth: 1,
					outlineStyle: 'dashed',
					outlineOffset: -1,
				},
				display: 'flex',
				borderWidth: 2,
				borderRadius: 2,
				borderColor: '#eeeeee',
				borderStyle: 'dashed',
				backgroundColor: '#fafafa',
				height: 'stretch',
				width: '100%',
				position: 'relative',
			}}
		>
			{selectedFile ? (
				<Image
					alt={selectedFile.name}
					src={URL.createObjectURL(selectedFile)}
					fill
					style={{ objectFit: 'contain' }}
				/>
			) : (
				<div {...getRootProps({ style })}>
					<input {...getInputProps()} />
					<Typography color={'GrayText'}>
						Pressione ou arraste uma imagem aqui
					</Typography>
				</div>
			)}
		</Box>
	);
};

export default DropZoneComponent;
