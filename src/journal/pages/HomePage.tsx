import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const HomePage = ({ drawerWidth = 240 }) => {
	return (
		<JournalLayout>
			{/* <NothingSelectedView /> */}
			<NoteView />
		</JournalLayout>
	);
};
