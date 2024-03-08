'use client';

import { FunctionComponent, useState } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import Button from '@mui/material/Button';
import RadialSelector from './RadialSelector';
import { generateRandomString } from '@/lib/helper';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	PluginDataRecord,
	PluginDataVisibilityOptions,
} from '@/types/pocketbase-types';
import usePbAuth from '@/hooks/usePbAuth';
import { createPluginData } from '@/lib/apiHelpers/pluginDataAPI';

interface OptionType {
	label: string;
	tip: string;
}

const RadialSelectorEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
	article,
}) => {
	const [optionsArray, setOptionsArray] = useState<OptionType[]>([]);
	const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
		undefined
	);
	const [showAnswerToUser, setShowAnswerToUser] = useState(true);

	const [, user] = usePbAuth();
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		setIsOpen(false);
	};

	const handleCreate = async () => {
		if (user === null) {
			toast.error('Usuário não encontrado');
			return;
		}

		const id = generateRandomString(10);
		const optionsString = optionsArray.map((o) => o.label).join('~,~');

		const newPluginData: PluginDataRecord = {
			uniqueId: id,
			user: user.id,
			article: article.id,
			data: {
				correctAnswer: correctAnswer,
			},
			visibility: showAnswerToUser
				? PluginDataVisibilityOptions.public
				: PluginDataVisibilityOptions.private,
		};
		try {
			const resp = await createPluginData(newPluginData);
		} catch (error) {
			toast.error('Erro ao criar exercício radial');
			console.error(error);
			return;
		}

		returnFunction(
			<RadialSelector
				options={optionsString}
				uniqueId={id}
				answer={showAnswerToUser ? correctAnswer ?? '' : ''}
			/>
		);

		toast.success('Exercício radial criado com sucesso!');
	};

	return (
		<Box>
			<Typography variant="body2" color="text.secondary" pb={1}>
				Adicione opções para o exercício radial e selecione a resposta
				correta.
			</Typography>
			<Paper sx={{ p: 1 }}>
				{optionsArray.length === 0 ? (
					<Typography variant="body2" color="text.secondary" py={2}>
						Utilize o campo abaixo para adicionar opções
					</Typography>
				) : (
					<FormControl
						sx={{
							width: '100%',
							pl: 1,
						}}
					>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="female"
							name="radio-buttons-group"
							value={correctAnswer}
							onChange={(e) => {
								setCorrectAnswer(e.target.value);
							}}
						>
							{optionsArray.map((option, index) => {
								const isAnswer = correctAnswer === option.label;

								return (
									<Box
										display={'flex'}
										width={'100%'}
										justifyContent={'space-between'}
										key={index}
									>
										<FormControlLabel
											value={option.label}
											control={<Radio />}
											label={
												<Box>
													<Typography
														sx={{
															fontWeight: isAnswer
																? 'bold'
																: 'inherit',
															textWrap: 'wrap',
															flexWrap: 'wrap',
														}}
													>
														{option.label}
													</Typography>
													{/* <Typography
														variant="body2"
														color="text.secondary"
														pb={1}
													>
														{option.tip}
													</Typography> */}
												</Box>
											}
											sx={{
												color: isAnswer
													? 'primary.main'
													: 'inherit',
											}}
										/>

										<Box>
											<IconButton
												aria-label="delete"
												color="error"
												onClick={() => {
													setOptionsArray(
														optionsArray.filter(
															(_, i) =>
																i !== index
														)
													);
												}}
											>
												<DeleteIcon fontSize="inherit" />
											</IconButton>
										</Box>
									</Box>
								);
							})}
						</RadioGroup>
					</FormControl>
				)}

				<Button
					sx={{
						mt: 1,
					}}
					onClick={() => {
						setIsOpen(true);
					}}
					color="success"
					variant="outlined"
					fullWidth
					endIcon={<AddIcon />}
				>
					Nova opção
				</Button>
				<Dialog
					onClose={handleClose}
					open={isOpen}
					maxWidth="xs"
					fullWidth
				>
					<DialogTitle>Adicionar nova opção</DialogTitle>
					<DialogContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								const data: FormData = new FormData(
									e.currentTarget
								);
								const newOptionLabel =
									data.get('new-option-label')?.toString() ??
									'';
								// const newOptionTip =
								// 	data.get('new-option-tip')?.toString() ??
								// 	'';

								if (newOptionLabel === '') {
									toast.error('Opção inválida');
									return;
								}

								if (
									optionsArray.find(
										(option) =>
											option.label === newOptionLabel
									) !== undefined
								) {
									toast.error('Opção já existente');
									return;
								}

								handleClose();
								setOptionsArray([
									...optionsArray,
									{
										label: newOptionLabel,
										tip: '',
									},
								]);
								if (correctAnswer === undefined)
									setCorrectAnswer(newOptionLabel);
							}}
						>
							<Stack
								direction={'column'}
								alignItems={'center'}
								spacing={2}
								pt={1}
							>
								<TextField
									id="outlined-basic"
									variant="outlined"
									required
									label="Nova opção"
									name="new-option-label"
									fullWidth
									autoFocus={true}
									placeholder="Opção para o exercício radial"
									multiline
								/>
								{/* <TextField
									id="outlined-basic"
									variant="outlined"
									name="new-option-tip"
									label="Dica"
									fullWidth
									placeholder="O que há de certo ou errado nesta opção?"
									multiline
								/> */}

								<Button
									variant="contained"
									fullWidth
									endIcon={<AddIcon />}
									type="submit"
								>
									Confirmar
								</Button>
							</Stack>
						</form>
					</DialogContent>
				</Dialog>
			</Paper>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked
							value={showAnswerToUser}
							onChange={(e) => {
								setShowAnswerToUser(e.target.checked);
							}}
						/>
					}
					label="Mostrar resposta ao usuário"
				/>
			</FormGroup>
			<Box display={'flex'} width={'100%'} flexDirection={'row-reverse'}>
				<Button
					onClick={() => {
						handleCreate();
					}}
					variant="contained"
				>
					Concluído
				</Button>
			</Box>
		</Box>
	);
};

export default RadialSelectorEditor;
