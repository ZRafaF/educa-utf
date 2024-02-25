import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import type { Metadata } from 'next/types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import TextField from '@mui/material/TextField/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ReportsTypeOptions } from '@/types/pocketbase-types';

export const metadata: Metadata = {
	title: 'Reportar - EducaUTF',
	description: 'Reportar conteúdo do EducaUTF.',
	keywords: ['EducaUTF', 'Educa UTF', 'report', 'reportar'],
};

interface PageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const Page: FunctionComponent<PageProps> = ({ searchParams }) => {
	const defaultType = String(searchParams?.type ?? ReportsTypeOptions.Outro);
	const defaultId = String(searchParams?.id ?? '');
	const availableTypes = Object.keys(ReportsTypeOptions).map(
		(key) => ReportsTypeOptions[key as keyof typeof ReportsTypeOptions]
	);

	return (
		<form
			action={async (e) => {
				'use server';
				const submitedDescription = e.get('description');
				const submitedType = e.get('type');
				console.log(submitedType);
			}}
		>
			<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
				<Typography component="h1" variant="h4" align="center" pb={2}>
					Reportar
				</Typography>
				<Paper
					elevation={0}
					variant="outlined"
					sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Stack spacing={1}>
						<Typography variant="h6" gutterBottom>
							Informações básicas
						</Typography>
						<Grid container spacing={2}>
							<Grid xs={6}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Tipo
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Tipo"
										name="type"
										required
										defaultValue={defaultType}
									>
										{availableTypes.map((type) => {
											console.log(type === defaultType);

											return (
												<MenuItem
													key={type}
													value={type}
												>
													{type}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
							<Grid xs={6}>
								<TextField
									name="id"
									label={`ID`}
									helperText="Id do item que deseja reportar."
									fullWidth
									autoComplete="id"
									defaultValue={defaultId}
								/>
							</Grid>
							<Grid xs={12}>
								<TextField
									name="description"
									label={`Descrição...`}
									helperText="Descreva o que há de errado com o conteúdo."
									fullWidth
									multiline
									rows={5}
									autoComplete="description"
								/>
							</Grid>
						</Grid>

						<Stack
							direction={'row'}
							width={'100%'}
							justifyContent={'end'}
							gap={2}
						>
							<Button variant="outlined">Cancelar</Button>
							<Button type="submit" variant="contained">
								Enviar
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Container>
		</form>
	);
};

export default Page;
