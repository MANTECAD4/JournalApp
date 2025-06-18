import { SaveOutlined } from '@mui/icons-material';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
	return (
		<Grid container direction="row" alignItems="center" sx={{ mb: 1 }}>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				sx={{ width: '100%' }}
			>
				<Grid>
					<Typography fontSize={39} fontFamily="cursive" fontWeight="light">
						September 18th, 2022
					</Typography>
				</Grid>
				<Grid>
					<Button sx={{ padding: 2, px: 3 }}>
						<SaveOutlined />
						Save
					</Button>
				</Grid>
			</Grid>
			<Divider sx={{ width: '100%', mb: 2 }} />
			{/* Text Fields */}
			<Grid container sx={{ width: '100%' }}>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Dear diary..."
					label="Title"
					sx={{
						border: 'none',
						mb: 2,
					}}
					slotProps={{
						htmlInput: {
							sx: {
								'::placeholder': {
									fontFamily: 'Monsieur La Doulaise',
									fontStyle: 'italic',
								},
							},
						},
					}}
				/>
				<TextField
					type="text"
					multiline
					variant="filled"
					fullWidth
					placeholder="What happened today??"
					minRows={5}
					// label="Description"
					sx={{ border: 'none', mb: 2 }}
					slotProps={{
						htmlInput: {
							sx: {
								'::placeholder': {
									fontFamily: 'Monsieur La Doulaise',
									fontStyle: 'italic',
								},
							},
						},
					}}
				/>
			</Grid>
			<ImageGallery />
		</Grid>
	);
};
