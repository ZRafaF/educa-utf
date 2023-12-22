// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { getKeyWordListBySimilar } from '@/lib/apiHelpers/keyWordsAPI';
import { KeyWordsResponse } from '@/types/pocketbase-types';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import usePbAuth from '@/hooks/usePbAuth';

interface InsertKeyWordButtonProps {
	inputValue: string | undefined;
	setSelectedKeyWords: Dispatch<SetStateAction<string[]>>;
	selectedKeyWords: string[];
	keyWords: string[];
	invalidWord: boolean;
}

const InsertKeyWordButton: FunctionComponent<InsertKeyWordButtonProps> = ({
	inputValue,
	setSelectedKeyWords,
	selectedKeyWords,
	keyWords,
	invalidWord,
}) => {
	const [, user] = usePbAuth();

	const createAndInsertKeyWord = async () => {
		if (inputValue === undefined || inputValue === '' || user === null)
			return;

		setSelectedKeyWords((prev) => [...prev, inputValue]);
	};

	return (
		<>
			<Button
				variant="outlined"
				startIcon={<AddIcon />}
				sx={{
					textTransform: 'none',
				}}
				disabled={
					keyWords.some((word) => word === inputValue) ||
					selectedKeyWords.some((word) => word === inputValue) ||
					invalidWord
				}
				onClick={() => {
					createAndInsertKeyWord();
				}}
			>
				{inputValue}
			</Button>
		</>
	);
};

interface KeyWordsPickerProps {
	defaultKeyWords: KeyWordsResponse[] | undefined;
}

const KeyWordsPicker: FunctionComponent<KeyWordsPickerProps> = ({
	defaultKeyWords = [],
}) => {
	const [selectedKeyWords, setSelectedKeyWords] = useState<string[]>(
		defaultKeyWords.map((word) => word.word)
	);
	const [keyWords, setKeyWords] = useState<string[]>([]);
	const [fetchingKeyWords, setFetchingKeyWords] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);

	const invalidWord = useMemo(() => {
		// checks if the keywords is only lowercase letters, numbers and -

		if (inputValue === undefined || inputValue === '') return false;
		return !/^[a-z0-9-]+$/.test(inputValue);
	}, [inputValue]);

	const debounce = useDebouncedCallback(
		async (value: string | undefined) => {
			setFetchingKeyWords(true);
			if (value === undefined || value.length < 1) {
				setKeyWords([...selectedKeyWords]);
			} else {
				try {
					const response = await getKeyWordListBySimilar(value);

					setKeyWords([
						...selectedKeyWords,
						...response.map((word) => word.word),
					]);
				} catch (error) {
					console.error('Error fetching key words:', error);
				}
			}

			setFetchingKeyWords(false);
		},
		// delay in ms
		500
	);
	// TODO - Fix the console error on Autocomplete

	return (
		<>
			<Autocomplete
				multiple
				id="tags-outlined"
				options={keyWords}
				getOptionLabel={(option) => option}
				filterSelectedOptions
				defaultValue={[]}
				fullWidth
				autoHighlight
				includeInputInList
				autoComplete
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={
							selectedKeyWords.length < 5
								? 'palavra-chave...'
								: undefined
						}
						name="keywords-picker"
						label="Até 5 Palavras-chave..."
						error={invalidWord}
						helperText={
							'Palavras devem ser minúsculas, sem espaços ou acentos. ex.: calculo-numerico.'
						}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{fetchingKeyWords ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
				onInputChange={(_, newInputValue) => {
					setInputValue(newInputValue);

					if (selectedKeyWords.length < 5) {
						debounce(newInputValue);
						setFetchingKeyWords(true);
					}
				}}
				value={selectedKeyWords}
				onChange={(_, newValue) => {
					setSelectedKeyWords(newValue);
				}}
				groupBy={() => 'true'}
				renderGroup={(params) => (
					<li key={params.key}>
						<ul style={{ padding: 0 }}>{params.children}</ul>
						<Box px={2} pb={1}>
							<Divider
								sx={{
									my: 1,
									color: 'GrayText',
								}}
							>
								Inserir palavra
							</Divider>
							<InsertKeyWordButton
								inputValue={inputValue}
								setSelectedKeyWords={setSelectedKeyWords}
								selectedKeyWords={selectedKeyWords}
								keyWords={keyWords}
								invalidWord={invalidWord}
							/>
						</Box>
					</li>
				)}
				noOptionsText={(() => {
					if (selectedKeyWords.length >= 5) {
						return (
							<Box color={'error.main'}>
								Limite de palavras-chave atingido
							</Box>
						);
					}
					if (fetchingKeyWords) return 'Buscando palavras...';

					if (inputValue)
						return (
							<InsertKeyWordButton
								inputValue={inputValue}
								selectedKeyWords={selectedKeyWords}
								setSelectedKeyWords={setSelectedKeyWords}
								keyWords={keyWords}
								invalidWord={invalidWord}
							/>
						);

					return 'Insira uma palavra-chave';
				})()}
			/>
			<input
				name="keywords"
				value={selectedKeyWords.map((word) => word).join(',')}
				style={{
					display: 'none',
				}}
			/>
		</>
	);
};

export default KeyWordsPicker;
