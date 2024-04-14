'use client';

import { FunctionComponent, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';
import FormHelperText from '@mui/material/FormHelperText';

interface PasswordInputProps {
	label: string;
	name: string;
	inputProps?: InputBaseComponentProps;
	helperText?: string;
}

const PasswordInput: FunctionComponent<PasswordInputProps> = ({
	label,
	name,
	inputProps,
	helperText,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<FormControl variant="outlined" fullWidth margin="dense">
			<InputLabel htmlFor="outlined-adornment-password">
				{label}
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-password"
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				inputProps={inputProps}
				name={name}
				label={label}
			/>
			{helperText != undefined && (
				<FormHelperText id="outlined-weight-helper-text">
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default PasswordInput;
