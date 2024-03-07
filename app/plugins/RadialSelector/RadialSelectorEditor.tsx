'use client';

import { FunctionComponent, RefObject, useMemo, useRef, useState } from 'react';
import { PluginEditorProps } from '../PluginsTypes';
import Button from '@mui/material/Button';
import RadialSelector from './RadialSelector';
import { generateRandomString } from '@/lib/helper';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
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

const RadialSelectorEditor: FunctionComponent<PluginEditorProps> = ({
	returnFunction,
}) => {
	const [optionsArray, setOptionsArray] = useState<string[]>([]);
	const [correctAnswerArray, setCorrectAnswerArray] = useState<string[]>([]);

	const [newOption, setNewOption] = useState<string>('');

	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		setIsOpen(false);
	};

	const handleCreate = () => {
		const id = generateRandomString(10);
		const optionsString = optionsArray.join('~,~');

		returnFunction(
			<RadialSelector
				options={optionsString}
				uniqueId={id}
				multiple={correctAnswerArray.length > 1}
			/>
		);

		toast.success('Exercício radial criado com sucesso!');
	};

	return (
		<Box>
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
						>
							{optionsArray.map((option, index) => {
								const isAnswer = Boolean(
									correctAnswerArray.find((v) => v === option)
								);

								return (
									<Box
										display={'flex'}
										width={'100%'}
										justifyContent={'space-between'}
										key={index}
									>
										<FormControlLabel
											value={option}
											control={<Radio />}
											label={option}
											sx={{
												color: isAnswer
													? 'success.main'
													: 'inherit',

												textDecoration: isAnswer
													? 'underline'
													: 'none',
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
					variant="outlined"
					fullWidth
					endIcon={<AddIcon />}
				>
					Nova opção
				</Button>
				<Dialog onClose={handleClose} open={isOpen} fullWidth>
					<DialogTitle>Adicionar nova opção</DialogTitle>
					<DialogContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();

								if (
									optionsArray.find(
										(option) => option === newOption
									) !== undefined
								) {
									toast.error('Opção já existente');
									return;
								}
								const data: FormData = new FormData(
									e.currentTarget
								);
								const isCorrectAnswer = Boolean(
									data.get('correct-answer')
								);

								handleClose();
								setOptionsArray([...optionsArray, newOption]);
								if (isCorrectAnswer) {
									setCorrectAnswerArray([
										...correctAnswerArray,
										newOption,
									]);
								}
								setNewOption('');
							}}
						>
							<Stack
								direction={'column'}
								alignItems={'center'}
								spacing={1}
								pt={1}
							>
								<TextField
									id="outlined-basic"
									variant="outlined"
									required
									label="Nova opção"
									fullWidth
									onChange={(e) => {
										setNewOption(e.target.value);
									}}
									autoFocus={true}
									value={newOption}
									placeholder="Opção para o exercício radial"
								/>
								<TextField
									id="outlined-basic"
									variant="outlined"
									label="Dica"
									fullWidth
									placeholder="O que há de certo ou errado nesta opção?"
								/>
								<FormGroup
									sx={{
										width: '100%',
									}}
								>
									<FormControlLabel
										control={<Checkbox />}
										label="Resposta correta"
										name="correct-answer"
									/>
								</FormGroup>
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
					control={<Checkbox defaultChecked />}
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
function useEffect(arg0: () => void, arg1: never[]) {
	throw new Error('Function not implemented.');
}
