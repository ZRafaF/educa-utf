// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import Radio from '@mui/material/Radio/Radio';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Stack from '@mui/material/Stack/Stack';
import DropZoneComponent from '@/components/DropZoneComponent/DropZoneComponent';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import NextLink from 'next/link';
import Link from '@mui/material/Link/Link';

interface EditMetadataProps {}

const EditMetadata: FunctionComponent<EditMetadataProps> = () => {
	return (
		<Paper
			elevation={0}
			variant="outlined"
			sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
		>
			<Typography variant="h6" gutterBottom>
				Informações básicas
			</Typography>
			<Grid container spacing={3}>
				<Grid xs={12} md={6}>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={2}
					>
						<TextField
							required
							id="article-title"
							label="Titulo do artigo..."
							helperText="Máximo de 64 carácteres"
							inputProps={{
								minLength: 1,
								maxLength: 64,
							}}
							fullWidth
							autoComplete="article-name"
						/>
						<TextField
							required
							id="article-tag"
							label="Tags..."
							helperText="Tags devem ser em minusculo e separadas por espaço"
							fullWidth
							autoComplete="article-tag"
						/>
					</Stack>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						id="article-description"
						label="Descrição do artigo..."
						helperText="Máximo de 256 carácteres"
						inputProps={{
							maxLength: 256,
						}}
						fullWidth
						multiline
						rows={5}
						autoComplete="article-description"
					/>
				</Grid>

				<Grid xs={12}>
					<Stack
						direction={{
							xs: 'column',
							sm: 'column',
							md: 'row-reverse',
						}}
						justifyContent="space-between"
						alignItems="flex-start"
						spacing={2}
					>
						<DropZoneComponent />

						<Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={2}
						>
							<Box>
								<FormLabel id="visibility-radio-buttons">
									<Typography variant="body2">
										Visibilidade:
									</Typography>
								</FormLabel>
								<RadioGroup
									aria-labelledby="visibility-radio-buttons"
									defaultValue="public"
									name="visibility-radio-buttons"
									row
								>
									<FormControlLabel
										value="public"
										control={<Radio size="small" />}
										label="Publico"
									/>
									<FormControlLabel
										value="private"
										control={<Radio size="small" />}
										label="Privado"
									/>
								</RadioGroup>
							</Box>
							<Stack
								direction="column"
								justifyContent="center"
								alignItems="flex-start"
							>
								<FormControlLabel
									control={
										<Checkbox
											required
											value="accept-terms"
											name="accept-terms"
											id="accept-terms"
										/>
									}
									label={
										<>
											<Typography
												variant="body2"
												fontSize={13}
											>
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
									}}
								>
									Criar artigo
								</Button>
							</Stack>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default EditMetadata;
