import { Cancel, DeleteForever } from '@mui/icons-material';
import { Box, Button, Fade, Grid, Modal, Typography } from '@mui/material';

type Props = {
	onDeleteImage: Function;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	imgItemId: string;
};
const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
export const DeleteImgModal = ({
	onDeleteImage,
	isOpen,
	setIsOpen,
	imgItemId,
}: Props) => {
	return (
		<>
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
			>
				<Fade in={isOpen}>
					<Box sx={modalStyle}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Delete this image?
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							This action cannot be undone.
						</Typography>
						<Grid container direction="row" sx={{ pt: 2 }}>
							<Button
								onClick={() => {
									onDeleteImage(imgItemId);
									setIsOpen(false);
								}}
								variant="contained"
								size="large"
								color="error"
								sx={{
									alignItems: 'center',
									mr: 2,
								}}
							>
								<DeleteForever />
								Yes, delete it.
							</Button>
							<Button
								onClick={() => setIsOpen(false)}
								variant="contained"
								color="info"
								size="large"
								sx={{ alignItems: 'center' }}
							>
								<Cancel />
								Cancel
							</Button>
						</Grid>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};
