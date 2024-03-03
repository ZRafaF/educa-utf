import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FunctionComponent, useMemo } from 'react';

interface RadialSelectorProps {
	multiple?: boolean;
	options: string;
	answare: string;
}

const RadialSelector: FunctionComponent<RadialSelectorProps> = ({
	multiple,
	options,
	answare,
}) => {
	const optionsArray = useMemo(() => options.split(','), [options]);

	const optionsObj = useMemo(() => {
		console.log(options);

		try {
			return JSON.parse(options);
		} catch (error) {
			return {};
		}
	}, [options]);

	console.log(optionsObj);

	return (
		<Box>
			options: {options}
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="female"
					name="radio-buttons-group"
				>
					{optionsArray.map((option, index) => (
						<FormControlLabel
							key={index}
							value={option}
							control={<Radio />}
							label={option}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</Box>
	);
};

export default RadialSelector;
