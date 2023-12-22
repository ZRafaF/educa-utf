// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { TagsResponse } from '@/types/pocketbase-types';
import { getFullListOfTags } from '@/lib/apiHelpers/tagsAPI';

const GroupHeader = styled('div')(({ theme }) => ({
	position: 'sticky',
	top: '-8px',
	padding: '10px 10px',
	fontWeight: 'bold',
	backgroundColor:
		theme.palette.mode === 'light'
			? lighten(theme.palette.primary.light, 0.65)
			: darken(theme.palette.primary.main, 0.65),
}));

const GroupItems = styled('ul')({
	padding: 0,
});

interface TagPickerProps {
	defaultTag: TagsResponse | undefined;
}

const TagPicker: FunctionComponent<TagPickerProps> = ({ defaultTag }) => {
	const [tags, setTags] = useState<TagsResponse[]>([]);
	const [tagCategory, setTagCategory] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getFullListOfTags();
				setTags(response);
			} catch (error) {
				console.error('Error fetching tags:', error);
			}
		};

		fetchData();
	}, []);

	// TODO - Fix the console error on Autocomplete

	return (
		<>
			<Autocomplete
				id="tag-picker-autocomplete"
				options={tags}
				groupBy={(option) => option.category}
				getOptionLabel={(option) => option.name}
				fullWidth
				autoComplete
				autoHighlight
				onChange={(_, newValue) => {
					setTagCategory(newValue?.category);
				}}
				isOptionEqualToValue={(option, value) => {
					return (
						option.name === value.name &&
						option.category === value.category
					);
				}}
				defaultValue={defaultTag}
				renderInput={(params) => (
					<TextField
						{...params}
						required
						label="Tag principal..."
						name="tag-picker"
					/>
				)}
				noOptionsText={'Nenhuma opção'}
				renderGroup={(params) => (
					<li key={params.key}>
						<GroupHeader>{params.group}</GroupHeader>
						<GroupItems>{params.children}</GroupItems>
					</li>
				)}
			/>
			<input
				name="tag-category"
				value={tagCategory}
				style={{
					display: 'none',
				}}
			/>
		</>
	);
};

export default TagPicker;
