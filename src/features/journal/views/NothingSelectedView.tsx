import { useSelector } from 'react-redux';
import { Grid, IconButton, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import CircularText from '../../../ui/components/CircularText/CircularText/CircularText';
import { useAppDispatch, type RootState } from '../../../store/store';
import { startCreatingEmptyNote } from '../../../store/journal/thunks';

export const NothingSelectedView = () => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	const dispatch = useAppDispatch();

	const onCreateNote = () => {
		dispatch(startCreatingEmptyNote());
	};

	return (
		<Grid
			className="animate__animated animate__fadeIn"
			container
			spacing={0}
			direction="column"
			justifyContent="center"
			alignItems="center"
			sx={{
				minHeight: 'calc(100vh - 80px) ',
				backgroundColor: 'primary.main',
				borderRadius: 5,
			}}
		>
			<Grid sx={{ gridColumn: { xs: 'span 12' } }}>
				<CircularText
					text="JOURNAL*APP*"
					onHover="speedUp"
					spinDuration={20}
					className="custom-class"
				/>
			</Grid>
			<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 2 }}>
				<Typography color="white" variant="h6">
					Select or create a new entry
				</Typography>
			</Grid>
			<IconButton
				disabled={isSaving}
				onClick={onCreateNote}
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
				<Add sx={{ fontSize: 35 }} />
			</IconButton>
		</Grid>
	);
};
