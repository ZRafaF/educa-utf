// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CoverPicker from '@/components/EditMetadata/CoverPicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent } from 'react';

interface CoverPickerDialogProps {
	handleClose: () => void;
	open: boolean;
}

const CoverPickerDialog: FunctionComponent<CoverPickerDialogProps> = ({
	handleClose,
	open,
}) => {
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Trocar imagem de capa</DialogTitle>
			<DialogContent
				sx={{
					p: 1,
				}}
			>
				<Box display={'flex'} justifyContent={'center'} width={'100%'}>
					<CoverPicker overrideType="chapter" />
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					p: 2,
					minWidth: 200,
				}}
			>
				<Button type="submit" variant="contained" onClick={handleClose}>
					Feito
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CoverPickerDialog;
