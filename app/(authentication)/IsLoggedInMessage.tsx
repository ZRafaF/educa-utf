'use client';
import PageMessage from '@/components/PageMessage/PageMessage';
import usePbAuth from '@/hooks/usePbAuth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface IsLoggedInMessageProps {
	children: ReactNode;
}

const IsLoggedInMessage: FunctionComponent<IsLoggedInMessageProps> = ({
	children,
}) => {
	const [, user] = usePbAuth();
	if (user?.id) {
		return (
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				gap={2}
			>
				<PageMessage message="Ops. Parece que você já está logado..." />

				<Button
					LinkComponent={Link}
					href="/"
					sx={{
						mx: 'auto',
					}}
					variant="contained"
				>
					Clique aqui para voltar a página inicial
				</Button>
			</Box>
		);
	}
	return children;
};

export default IsLoggedInMessage;
