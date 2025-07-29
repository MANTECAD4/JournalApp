import Box from '@mui/material/Box';
import { ImageList, Typography } from '@mui/material';
import React from 'react';
import { NoteImageItem } from './NoteImageItem';
import type { NoteImage } from '../../../../../store/journal/journalSlice.types';
type Props = {
	images: NoteImage[];
};
export const ImageGallery = React.memo(({ images }: Props) => {
	return (
		<Box
			sx={{
				flex: 1,
				overflowY: 'auto',
				paddingBottom: 2,
				alignContent: 'center',
				maxHeight: 'calc(100vh - 400px)',
			}}
		>
			{images.length > 0 ? (
				<ImageList variant="masonry" cols={3} gap={8}>
					{images.map((item) => (
						<NoteImageItem item={item} />
					))}
				</ImageList>
			) : (
				<Box
					sx={{
						height: '100%',
						width: '100%',
						display: 'flex',
						minHeight: '400px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="h5" fontFamily={'Playwrite HU'}>
						Nothing over here ...
					</Typography>
				</Box>
			)}
		</Box>
	);
});
