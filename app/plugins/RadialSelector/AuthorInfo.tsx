'use client';
import { FunctionComponent, useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ArticlesResponse, UsersResponse } from '@/types/pocketbase-types';

interface AuthorInfoProps {
	uniqueId: string;
	article: ArticlesResponse;
	user: UsersResponse | null;
}

const AuthorInfo: FunctionComponent<AuthorInfoProps> = ({
	uniqueId,
	article,
	user,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		setIsOpen(false);
	};

	if (user === null) {
		return null;
	}

	return (
		<>
			<IconButton
				aria-label="info"
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					m: 1,
				}}
				color="primary"
				onClick={() => setIsOpen(true)}
			>
				<InfoIcon />
			</IconButton>
			<Dialog onClose={handleClose} open={isOpen}>
				<DialogTitle>
					Artigo: {article.id} ID: {uniqueId}
				</DialogTitle>
			</Dialog>
		</>
	);
};

export default AuthorInfo;
