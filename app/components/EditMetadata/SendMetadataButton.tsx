// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { FunctionComponent, useState } from 'react';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import NextLink from 'next/link';
import Link from '@mui/material/Link/Link';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider';

interface SendMetadataButtonProps {}

const SendMetadataButton: FunctionComponent<SendMetadataButtonProps> = () => {
	const [accept, setAccept] = useState<boolean>(false);

	return (
		<>
			<Divider
				sx={{
					my: 2,
				}}
			/>
			<Stack
				direction={{ sm: 'column', md: 'row-reverse' }}
				justifyContent="flex-end"
				alignItems="flex-start"
			>
				<FormControlLabel
					sx={{
						mb: 1,
					}}
					control={
						<Checkbox
							required
							value="accept-terms"
							name="accept-terms"
							id="accept-terms"
							checked={accept}
							onChange={(e) => {
								setAccept(e.target.checked);
							}}
						/>
					}
					label={
						<>
							<Typography variant="body2" fontSize={13}>
								Declaro que li e concordo com os{' '}
								<Link
									href="/terms"
									component={NextLink}
									underline="hover"
									alignItems="center"
									target="_blank"
								>
									Termos de Serviço
								</Link>
								{' e '}
								<Link
									href="/privacy"
									component={NextLink}
									underline="hover"
									alignItems="center"
									target="_blank"
								>
									Política de Privacidade
								</Link>
							</Typography>
						</>
					}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{
						p: 1.5,
						mr: 2,
					}}
					disabled={!accept}
				>
					Criar artigo
				</Button>
			</Stack>
		</>
	);
};

export default SendMetadataButton;
