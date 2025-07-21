import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useNote } from '../../hooks/useNote';

export const NoteView = () => {
	const {
		activeNote,
		handleSubmit,
		isSaving,
		onUpdateNote,
		register,
		isSaveEnabled,
		styledDate,
	} = useNote();

	return (
		<Grid
			className="animate__animated animate__fadeIn"
			sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
		>
			<form onSubmit={handleSubmit(onUpdateNote)}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					sx={{ width: '100%' }}
				>
					<Grid>
						<Typography fontSize={39} fontFamily="cursive" fontWeight="light">
							{styledDate}
						</Typography>
					</Grid>
					<Grid>
						<Button
							type="submit"
							disabled={isSaving || !isSaveEnabled}
							sx={{ padding: 2, px: 3 }}
						>
							<SaveOutlined />
							Save
						</Button>
						<Button
							disabled={isSaving}
							sx={{ padding: 2, px: 3, alignItems: 'center', color: 'red' }}
						>
							<DeleteOutline />
							<Typography
								sx={{
									display: { xs: 'none', sm: 'inline' },
								}}
							>
								Delete
							</Typography>
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
						{...register('title')}
						label="Title"
						defaultValue={activeNote!.title}
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
						defaultValue={activeNote!.body}
						minRows={5}
						// label="Description"
						{...register('body')}
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
			</form>
		</Grid>
	);
};
