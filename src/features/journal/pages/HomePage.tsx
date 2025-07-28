import { useSelector } from 'react-redux';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { type RootState } from '../../../store/store';

export const HomePage = () => {
	const { activeNote } = useSelector((state: RootState) => state.journal);

	return (
		<JournalLayout>
			{activeNote !== null ? <NoteView /> : <NothingSelectedView />}
		</JournalLayout>
	);
};
