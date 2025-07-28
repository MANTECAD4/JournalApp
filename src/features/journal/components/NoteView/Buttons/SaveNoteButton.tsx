import { SaveOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { startUpdatingNote } from '../../../../../store/journal/thunks';
type Props = {
	draftForm: {
		title: string;
		body: string;
	};
	isSaving: boolean;
	isSaveEnabled: boolean;
	isUpToDate: boolean;
};
export const SaveNoteButton = ({
	draftForm,
	isSaving,
	isSaveEnabled,
	isUpToDate,
}: Props) => {
	const dispatch = useAppDispatch();
	const { activeNote } = useSelector((state: RootState) => state.journal);

	const onUpdateNote = () => {
		if (isUpToDate) {
			toast.success(`Everything's up to date.`);
			return;
		}

		dispatch(
			startUpdatingNote({
				id: activeNote!.id,
				date: activeNote!.date,
				body: draftForm.body.trim(),
				title: draftForm.title.trim(),
				imageURLs: activeNote!.imageURLs,
			})
		);

		toast.success('Note updated');
	};
	return (
		<>
			<Button
				onClick={() => onUpdateNote()}
				size="medium"
				disabled={isSaving || !isSaveEnabled}
				color="success"
				sx={{ px: 3, py: 2 }}
			>
				<SaveOutlined />
				Save
			</Button>
		</>
	);
};
