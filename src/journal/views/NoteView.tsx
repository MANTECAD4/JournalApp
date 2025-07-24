import {
	CloseOutlined,
	DeleteOutline,
	SaveOutlined,
	UploadOutlined,
} from '@mui/icons-material';
import {
	Button,
	Divider,
	Fab,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { ImageGallery } from '../components';
import { useNote } from '../../hooks/useNote';
import { AnimatePresence, motion } from 'motion/react';

export const NoteView = () => {
	const {
		activeNote,
		fileInputRef,
		handleSubmit,
		isSaveEnabled,
		isSaving,
		onClosingNote,
		onDeleteNote,
		onUpdateNote,
		onUploadImages,
		register,
		styledDate,
	} = useNote();

	if (!activeNote) return;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={activeNote.id}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1 }}
				transition={{ duration: 0.1 }}
			>
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
								<Typography
									fontSize={39}
									fontFamily="cursive"
									fontWeight="light"
								>
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
									onClick={onClosingNote}
									sx={{ padding: 2, px: 3, alignItems: 'center' }}
								>
									<CloseOutlined />
									Close
								</Button>
								<Button
									onClick={onDeleteNote}
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
								placeholder="Start with a title! Dear diary..."
								{...register('title')}
								// label="Title"
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
						<ImageGallery images={activeNote.imageURLs} />
					</form>

					<Fab
						title="Upload images"
						onClick={() => fileInputRef.current!.click()}
						disabled={isSaving}
						size="large"
						sx={{
							':hover': { backgroundColor: 'error.main', opacity: 0.9 },
							backgroundColor: 'error.main',
							bottom: 40,
							color: 'white',
							position: 'fixed',
							right: 40,
						}}
					>
						<UploadOutlined sx={{ fontSize: 35 }} />
					</Fab>
					<input
						style={{ display: 'none' }}
						type="file"
						ref={fileInputRef}
						multiple
						onChange={onUploadImages}
					/>
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};
