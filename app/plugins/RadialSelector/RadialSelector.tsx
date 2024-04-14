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
import { PluginsResponse } from '@/types/pocketbase-types';
import {
	createUsersPluginData,
	getPluginData,
} from '@/lib/apiHelpers/pluginsAPI';
import { PluginDataType } from './PluginDataType';
import { toast } from 'react-toastify';

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
	const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

	const [pluginData, setPluginData] = useState<
		PluginsResponse<PluginDataType> | undefined
	>(undefined);

	useEffect(() => {
		if (isCorrect == true) {
			toast.success('Você acertou!');
		}
	}, [isCorrect]);

	useEffect(() => {
		const fetchPluginData = async () => {
			const dataResponse = await getPluginData<PluginDataType>(uniqueId);

			setPluginData(dataResponse);
		};

		if (pluginData === undefined) {
			fetchPluginData().catch((error) => {
				console.error('Error fetching plugin data', error);
			});
		}
	}, [article, uniqueId, setPluginData]);

	if (article === undefined || pluginData === undefined) {
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
				borderColor:
					isCorrect === undefined
						? 'inherit'
						: isCorrect
						? 'success.main'
						: 'error.main',
				// bgcolor:
				// 	isCorrect === undefined
				// 		? 'grey.A700'
				// 		: isCorrect
				// 		? 'success.main'
				// 		: 'error.main',
			}}
		>
			<AuthorInfo
				uniqueId={uniqueId}
				article={article}
				user={user}
				pluginData={pluginData}
			/>
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="female"
					name="radio-buttons-group"
					onChange={(event) => {
						const value = event.target.value;

						if (user) {
							createUsersPluginData(uniqueId, user.id, {
								answer: value,
							}).catch((error) => {
								console.error(
									'Error creating user plugin data',
									error
								);
							});
						}

						if (answer === '') return;

						setIsCorrect(value === answer);
					}}
				>
					{optionsArray.map((option, index) => (
						<FormControlLabel
							key={index}
							value={option}
							control={
								<Radio
									color={
										answer === ''
											? 'primary'
											: isCorrect == false
											? 'error'
											: 'success'
									}
								/>
							}
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
