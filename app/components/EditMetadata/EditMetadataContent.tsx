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
import SendMetadataButton from './SendMetadataButton';
import TagPicker from './TagPicker';
import { KeyWordsResponse, TagsResponse } from '@/types/pocketbase-types';
import KeyWordsPicker from '@/components/KeyWordsPicker/KeyWordsPicker';
import CoverPicker from './CoverPicker';

interface DefaultValues {
	title: string;
	tag: TagsResponse | undefined;
	key_words: KeyWordsResponse[] | undefined;
	description: string;
	visibility: 'public' | 'private';
}

interface EditMetadataContentProps {
	sendButton?: boolean;
	defaultValues?: DefaultValues;
	overrideType?: 'article' | 'chapter';
}

const EditMetadataContent: FunctionComponent<EditMetadataContentProps> = ({
	sendButton,
	defaultValues,
	overrideType,
}) => {
	return (
		<Stack spacing={1}>
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
							name="title"
							label={`Titulo...`}
							helperText="Máximo de 64 carácteres"
							inputProps={{
								minLength: 1,
								maxLength: 64,
							}}
							fullWidth
							autoComplete="title"
							defaultValue={defaultValues?.title}
						/>
						<TagPicker defaultTag={defaultValues?.tag} />
					</Stack>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						name="description"
						label={`Descrição...`}
						helperText="Máximo de 256 carácteres"
						inputProps={{
							maxLength: 256,
						}}
						fullWidth
						multiline
						rows={5}
						autoComplete="description"
						defaultValue={defaultValues?.description}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3} justifyContent="space-between">
				<Grid xs={12} sm={12} md>
					<Stack spacing={3}>
						<KeyWordsPicker
							defaultKeyWords={defaultValues?.key_words}
						/>

						<Box>
							<FormLabel>
								<Typography variant="body2">
									Visibilidade:
								</Typography>
							</FormLabel>
							<RadioGroup
								aria-labelledby="visibility-radio-buttons"
								defaultValue={
									defaultValues
										? defaultValues.visibility
										: 'public'
								}
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
					</Stack>
				</Grid>
				{overrideType !== 'article' && (
					<CoverPicker overrideType={overrideType} />
				)}
			</Grid>

			{sendButton && <SendMetadataButton />}
		</Stack>
	);
};

export default EditMetadataContent;
