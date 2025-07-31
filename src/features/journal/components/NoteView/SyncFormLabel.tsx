import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { Chip } from '@mui/material';
import { CloudDone, CloudSync } from '@mui/icons-material';

export const SyncFormLabel = () => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	return isSaving ? (
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
	);
};
