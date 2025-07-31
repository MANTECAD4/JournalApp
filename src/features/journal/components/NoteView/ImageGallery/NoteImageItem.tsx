import { Close } from '@mui/icons-material';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, type RootState } from '@/store/store';
import { startUpdatingNote } from '@/store/journal/thunks';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { NoteImage } from '@/store/journal/journalSlice.types';
import { DeleteImgModal } from '@/features/journal/components/NoteView/DeleteImgModal';

type Props = {
	item: NoteImage;
};
export const NoteImageItem = React.memo(({ item }: Props) => {
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);

	const dispatch = useAppDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [hideDeleteBtn, setHideDeleteBtn] = useState(true);

	const onDeleteImage = (imageId: string) => {
		dispatch(
			startUpdatingNote({
				body: activeNote!.body,
				title: activeNote!.title.trim(),
				imageUrls: activeNote!.imageUrls.filter(
					(image) => image.id !== imageId
				),
			})
		);
		toast.success('Image deleted.');
	};
	return (
		<ImageListItem
			key={item.id}
			onMouseEnter={() => setHideDeleteBtn(false)}
			onMouseLeave={() => setHideDeleteBtn(true)}
		>
			<img src={`${item.secure_url}`} loading="lazy" />
			<ImageListItemBar
				sx={{
					background:
						'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
						'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
				}}
				title={item.name}
				position="top"
				hidden={hideDeleteBtn}
				actionIcon={
					<IconButton
						disabled={isSaving}
						onClick={() => {
							setIsModalOpen(true);
							setHideDeleteBtn(true);
						}}
						sx={{ color: 'white' }}
						aria-label={`star ${item.name}`}
					>
						<Close />
					</IconButton>
				}
				actionPosition="left"
			/>
			<DeleteImgModal
				imgItemId={item.id}
				onDeleteImage={onDeleteImage}
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>
		</ImageListItem>
	);
});
