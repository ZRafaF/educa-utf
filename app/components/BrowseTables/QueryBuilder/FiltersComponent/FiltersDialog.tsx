// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent, useMemo, useState } from 'react';
import FilterTagPicker from './FilterTagPicker';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSearchParams } from 'next/navigation';
import { TagsResponse } from '@/types/pocketbase-types';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import KeyWordsPicker from '@/components/KeyWordsPicker/KeyWordsPicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';
import TextField from '@mui/material/TextField';
import AuthorPicker from './AuthorPicker';
import useQueryFilter from '@/hooks/useQueryFilter';

interface FiltersDialogProps {
	handleClose: () => void;
	isOpen: boolean;
}

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({
	handleClose,
	isOpen,
}) => {
	const [updateFilter] = useQueryFilter();
	const searchParams = useSearchParams()!;

	const filter = searchParams.get('tags') ?? '';
	const selectedTagsIds = useMemo(() => {
		// Split the filters by || then get the string in between '
		return filter.split('||').map((tag) => {
			return tag.split("'")[1];
		});
	}, [filter]);

	const [selectedTags, setSelectedTags] = useState<TagsResponse[]>([]);

	const handleChangeFilters = () => {
		const tagFilterString = selectedTags.map((tag) => tag.id);

		updateFilter(
			{
				tags: tagFilterString,
				search: undefined,
			},
			true
		);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			keepMounted
		>
			<DialogTitle id="alert-dialog-title">
				Filtros de pesquisa
			</DialogTitle>
			<DialogContent>
				<Grid container spacing={2} my={1}>
					<Grid xs={12}>
						<FilterTagPicker
							setSelectedTags={setSelectedTags}
							defaultTagsIds={selectedTagsIds}
							defaultTags={selectedTags}
							setDefaultTags={setSelectedTags}
						/>
					</Grid>

					<Grid xs={12} sm={6}>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="pt-br"
						>
							<DatePicker
								label="Data de criação minima"
								slotProps={{
									field: { clearable: true },
									textField: { fullWidth: true },
								}}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid xs={12} sm={6}>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="pt-br"
						>
							<DatePicker
								label="Data de criação máxima"
								slotProps={{
									field: { clearable: true },
									textField: { fullWidth: true },
								}}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid xs={12}>
						<KeyWordsPicker maxKeyWords={10} disableCreation />
					</Grid>
					<Grid xs={12}>
						<AuthorPicker />
					</Grid>
					<Grid xs={12}>
						<FormControl component="fieldset" variant="standard">
							<FormGroup>
								<FormControlLabel
									control={<Switch defaultChecked />}
									label="Incluir itens sem likes"
								/>
							</FormGroup>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					onClick={() => {
						handleChangeFilters();
						handleClose();
					}}
					autoFocus
					variant="contained"
				>
					Buscar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FiltersDialog;
