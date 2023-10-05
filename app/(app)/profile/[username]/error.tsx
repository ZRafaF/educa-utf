// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client'; // Error components must be Client Components

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import { useEffect } from 'react';
import { Button, Stack } from '@mui/material';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div data-mui-color-scheme="dark">
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					width: 'stretch',
					backgroundColor: 'black',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Paper
					variant="outlined"
					sx={{
						p: 2,
					}}
				>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={5}
					>
						<Typography variant="h5" gutterBottom>
							Oh não, algo deu errado!
						</Typography>
						<Typography>Talvez esse usuário não exista.</Typography>

						<Button
							onClick={
								// Attempt to recover by trying to re-render the segment
								() => reset()
							}
							color="error"
							variant="outlined"
						>
							Tentar recarregar a página
						</Button>
					</Stack>
				</Paper>
			</Box>
		</div>
	);
}
