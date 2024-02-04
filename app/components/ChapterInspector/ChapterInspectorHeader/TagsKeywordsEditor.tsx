// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import TagPicker from '@/components/EditMetadata/TagPicker';
import KeyWordsPicker from '@/components/KeyWordsPicker/KeyWordsPicker';
import { ChaptersExpand } from '@/types/expanded-types';
import { ChaptersResponse } from '@/types/pocketbase-types';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&::before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: 'rgba(255, 255, 255, .05)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
interface TagsKeywordsEditorProps {
	editedChapter: ChaptersResponse<ChaptersExpand>;
}

const TagsKeywordsEditor: FunctionComponent<TagsKeywordsEditorProps> = ({
	editedChapter,
}) => {
	return (
		<Box>
			<Accordion
				sx={{
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					mx: -1,
				}}
			>
				<Tooltip
					title="Editar tags e palavras-chave"
					arrow
					placement="right"
				>
					<AccordionSummary
						aria-controls="panel1-content"
						id="panel1-header"
					>
						<Typography>Tag e Palavras-chave</Typography>
					</AccordionSummary>
				</Tooltip>

				<AccordionDetails sx={{ p: 0 }}>
					<Grid container spacing={3} m={0}>
						<Grid xs={12}>
							<TagPicker
								defaultTag={editedChapter.expand?.tag}
								required
							/>
						</Grid>
						<Grid xs={12}>
							<KeyWordsPicker
								defaultKeyWords={
									editedChapter.expand?.key_words
								}
							/>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default TagsKeywordsEditor;
