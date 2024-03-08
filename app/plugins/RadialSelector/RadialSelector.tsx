'use client';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
	FunctionComponent,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import AuthorInfo from './AuthorInfo';
import ArticleIdContext from '@/contexts/ArticleIdContext';
import usePbAuth from '@/hooks/usePbAuth';
import { PluginDataResponse } from '@/types/pocketbase-types';
import { getPluginData } from '@/lib/apiHelpers/pluginDataAPI';

interface RadialSelectorProps {
	options: string;
	uniqueId: string;
	answer: string;
}

const RadialSelector: FunctionComponent<RadialSelectorProps> = ({
	options,
	uniqueId,
	answer,
}) => {
	const article = useContext(ArticleIdContext);
	const [, user] = usePbAuth();
	const optionsArray = useMemo(() => {
		return options.split('~,~');
	}, [options]);

	const [pluginData, setPluginData] = useState<
		PluginDataResponse | undefined
	>(undefined);

	const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
		answer
	);

	console.log('correctAnswer', correctAnswer);

	useEffect(() => {
		const fetchPluginData = async () => {
			if (article === undefined) {
				return;
			}
			const dataResponse = await getPluginData(uniqueId, article.id);
			setPluginData(dataResponse);
			if (dataResponse.data === undefined) {
				return;
			}
			setCorrectAnswer(
				(dataResponse.data as any).correctAnswer as string
			);
		};

		if (correctAnswer === undefined) fetchPluginData();
	}, [article, uniqueId, setPluginData]);

	if (article === undefined) {
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
			<AuthorInfo uniqueId={uniqueId} article={article} user={user} />
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
