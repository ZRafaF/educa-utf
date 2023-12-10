// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinkIcon from '@mui/icons-material/Link';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { deleteAttachmentFile } from '@/lib/apiHelpers/attachmentsAPI';

interface AttachmentCardProps {
	imageUrl: string;
	numberOfOccurrences: number;
	articleId: string;
	setForceUpdate: Dispatch<SetStateAction<boolean>>;
}

const AttachmentCard: FunctionComponent<AttachmentCardProps> = ({
	imageUrl,
	numberOfOccurrences,
	articleId,
	setForceUpdate,
}) => {
	const parts = imageUrl.split('/');
	const imageName = parts[parts.length - 1];

	const handleDeleteAttachment = async () => {
		const result = await deleteAttachmentFile(articleId, imageName);
		setForceUpdate((o) => !o);
	};

	return (
		<Tooltip title={imageUrl} arrow>
			<Card>
				<Paper variant="outlined">
					<CardMedia
						component="img"
						height="100"
						image={`${imageUrl}?thumb=300x300`}
						alt="Paella dish"
						style={{ objectFit: 'contain' }}
					/>
				</Paper>

				<Divider />

				<Stack
					direction="row"
					justifyContent="space-between"
					p={1}
					alignItems="center"
				>
					<Tooltip
						title="Numero de referências"
						placement="top"
						arrow
					>
						<Stack
							direction="row"
							spacing={2}
							p={1}
							justifyContent="space-between"
							alignItems="center"
						>
							<LinkIcon />
							<Typography color="text.secondary">
								{numberOfOccurrences}
							</Typography>
						</Stack>
					</Tooltip>

					<Tooltip title="Remover anexo" placement="top" arrow>
						<IconButton
							aria-label="add to favorites"
							color="error"
							onClick={() => {
								handleDeleteAttachment();
							}}
						>
							<DeleteForeverIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Card>
		</Tooltip>
	);
};

export default AttachmentCard;
