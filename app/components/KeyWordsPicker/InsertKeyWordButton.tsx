// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Button from '@mui/material/Button';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import AddIcon from '@mui/icons-material/Add';
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

export default InsertKeyWordButton;
