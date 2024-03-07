'use client';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FunctionComponent, useContext, useMemo } from 'react';
import AuthorInfo from './AuthorInfo';
import ArticleIdContext from '@/contexts/ArticleIdContext';
import usePbAuth from '@/hooks/usePbAuth';

interface RadialSelectorProps {
	multiple?: boolean;
	options: string;
	uniqueId: string;
}

const RadialSelector: FunctionComponent<RadialSelectorProps> = ({
	multiple,
	options,
	uniqueId,
}) => {
	const articleId = useContext(ArticleIdContext);
	const [, user] = usePbAuth();
	const optionsArray = useMemo(() => {
		return options.split('~,~');
	}, [options]);

	if (articleId === undefined) {
		return (
			<Paper
				variant="outlined"
				sx={{
					width: '100%',
					p: 1,
					position: 'relative',
					bgcolor: 'grey.A700',
				}}
			>
				Erro ao carregar o exercício radial de id: {uniqueId}
			</Paper>
		);
	}

	return (
		<Paper
			variant="outlined"
			sx={{
				width: '100%',
				py: 1,
				px: 2,
				position: 'relative',
				bgcolor: 'grey.A700',
			}}
		>
			<AuthorInfo uniqueId={uniqueId} article={articleId} user={user} />
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
		</Paper>
	);
};

RadialSelector.displayName = 'RadialSelector';

export default RadialSelector;
