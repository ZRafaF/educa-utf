import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FunctionComponent, useMemo } from 'react';

interface RadialSelectorProps {
	multiple?: boolean;
	options: string;
	answerIdx: number;
}

const RadialSelector: FunctionComponent<RadialSelectorProps> = ({
	multiple,
	options,
	answerIdx,
}) => {
	const optionsArray = useMemo(() => {
		return options.split('~,~');
	}, [options]);

	console.log(answerIdx);

	return (
		<Box>
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

RadialSelector.displayName = 'RadialSelector';

export default RadialSelector;
