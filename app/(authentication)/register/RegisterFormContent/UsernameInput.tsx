'use client';

import { checkValidUsername } from '@/lib/usernameHelper';
import TextField from '@mui/material/TextField';
import { FunctionComponent, useState } from 'react';

interface UsernameInputProps {}

const UsernameInput: FunctionComponent<UsernameInputProps> = () => {
	const [currentInput, setCurrentInput] = useState<string>('');
	const [usernameError, setUsernameError] = useState<string>('');

	return (
		<TextField
			margin="dense"
			required
			fullWidth
			id="username"
			label="Usuário"
			name="username"
			type="text"
			autoComplete="username"
			autoFocus
			inputProps={{
				minLength: 2,
				maxLength: 128,
			}}
			error={usernameError !== ''}
			helperText={usernameError}
			value={currentInput}
			onChange={(event) => {
				const newUsername = event.target.value;
				setCurrentInput(newUsername);
				const isValid = checkValidUsername(newUsername);
				if (!isValid.valid) {
					setUsernameError(isValid.reason);
				} else {
					setUsernameError('');
				}
			}}
		/>
	);
};

export default UsernameInput;
