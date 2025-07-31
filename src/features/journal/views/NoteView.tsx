import { useNote } from '../../../hooks/NoteView/useNote';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { AnimatePresence, motion } from 'motion/react';
import {
	CloseNoteButton,
	DeleteNoteButton,
	UploadImagesButton,
} from '../components/NoteView/Buttons/';
import { FormTextFields } from '../components/NoteView/TextFields/FormTextFields';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { CloudDone, CloudSync } from '@mui/icons-material';

export const NoteView = () => {
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);
	const { register, styledDate } = useNote();

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
					{/* Header part of the view */}
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						sx={{ width: '100%' }}
					>
						{/* Date display */}
						<Grid
							container
							direction={'row'}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<Typography
								sx={{ mr: 2 }}
								fontSize={39}
								fontFamily="cursive"
								fontWeight="light"
							>
								{styledDate}
							</Typography>
							{isSaving ? (
								<Chip
									title="Saving changes..."
									color="warning"
									size="medium"
									variant="outlined"
									icon={<CloudSync />}
									label="SAVING"
									clickable={false}
									onClick={() => {}}
								/>
							) : (
								<Chip
									title={`Everything's up to date`}
									color="success"
									size="medium"
									variant="outlined"
									icon={<CloudDone />}
									label="SAVED"
									clickable={false}
									onClick={() => {}}
								/>
							)}
						</Grid>
						{/* Buttons group */}
						<Grid>
							<CloseNoteButton />
							<DeleteNoteButton />
						</Grid>
					</Grid>

					<Divider sx={{ width: '100%', mb: 2 }} />
					{/* Form data */}
					<FormTextFields register={register} />
					{/* Masonr */}
					<ImageGallery images={activeNote.imageUrls} />
					{/* Upload images floating button */}
					<UploadImagesButton />
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};
