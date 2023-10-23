// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Box from '@mui/material/Box/Box';
import Radio from '@mui/material/Radio/Radio';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Stack from '@mui/material/Stack/Stack';
import DropZoneComponent from '@/components/DropZoneComponent/DropZoneComponent';
import SendMetadataButton from './SendMetadataButton';

interface DefaultValues {
	title: string;
	tags: string | string[];
	description: string;
	visibility: 'public' | 'private';
}

interface EditMetadataContentProps {
	sendButton?: boolean;
	defaultValues?: DefaultValues;
}

const EditMetadataContent: FunctionComponent<EditMetadataContentProps> = ({
	sendButton,
	defaultValues = {
		description: '',
		tags: '',
		title: '',
		visibility: 'public',
	},
}) => {
	return (
		<>
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
							name="article-title"
							label="Titulo do artigo..."
							helperText="Máximo de 64 carácteres"
							inputProps={{
								minLength: 1,
								maxLength: 64,
							}}
							fullWidth
							autoComplete="article-title"
							defaultValue={defaultValues.title}
						/>
						<TextField
							name="article-tag"
							label="Tags..."
							helperText="Tags devem ser em minusculo e separadas por espaço"
							fullWidth
							autoComplete="article-tag"
							defaultValue={defaultValues.tags}
						/>
					</Stack>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						name="article-description"
						label="Descrição do artigo..."
						helperText="Máximo de 256 carácteres"
						inputProps={{
							maxLength: 256,
						}}
						fullWidth
						multiline
						rows={5}
						autoComplete="article-description"
						defaultValue={defaultValues.description}
					/>
				</Grid>

				<Grid xs={12}>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="flex-start"
						spacing={2}
					>
						<Box>
							<FormLabel>
								<Typography variant="body2">
									Visibilidade:
								</Typography>
							</FormLabel>
							<RadioGroup
								aria-labelledby="visibility-radio-buttons"
								defaultValue={defaultValues.visibility}
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
						{sendButton && <SendMetadataButton />}
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default EditMetadataContent;
