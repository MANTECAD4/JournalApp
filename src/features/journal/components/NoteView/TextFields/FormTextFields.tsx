import { Grid, TextField } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { NoteViewTextFields } from '../../../../../hooks/NoteView/useNote.types';

type Props = {
	register: UseFormRegister<NoteViewTextFields>;
};
const style = {
	border: 'none',
	mb: 2,
};
const slotPropsStyle = {
	htmlInput: {
		sx: {
			'::placeholder': {
				fontFamily: 'Monsieur La Doulaise',
				fontStyle: 'italic',
			},
		},
	},
};
export const FormTextFields = ({ register }: Props) => {
	return (
		<Grid container sx={{ width: '100%' }}>
			<TextField
				type="text"
				variant="outlined"
				fullWidth
				placeholder="Start with a title! Dear diary..."
				{...register('title')}
				sx={style}
				slotProps={slotPropsStyle}
			/>
			<TextField
				type="text"
				multiline
				variant="outlined"
				fullWidth
				placeholder="What happened today??"
				minRows={5}
				{...register('body')}
				sx={style}
				slotProps={slotPropsStyle}
			/>
		</Grid>
	);
};
