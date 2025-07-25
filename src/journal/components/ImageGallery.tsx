import Box from '@mui/material/Box';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react';
type Props = {
	images: string[];
};
export const ImageGallery = React.memo(({ images }: Props) => {
	return (
		<Box
			sx={{
				flex: 1,
				overflowY: 'auto',
				paddingBottom: 2,
				alignContent: 'center',
				maxHeight: 'calc(100vh - 400px)', // ajusta según el tamaño del header y campos
			}}
		>
			{images.length > 0 ? (
				<ImageList variant="masonry" cols={3} gap={8}>
					{images.map((item) => (
						<ImageListItem key={item}>
							<img src={`${item}`} loading="lazy" />
						</ImageListItem>
					))}
				</ImageList>
			) : (
				<Box // este es el que quiero centrar
					sx={{
						height: '100%',
						width: '100%',
						display: 'flex',
						minHeight: '400px', //
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="h5" fontFamily={'cursive'}>
						,.-~*´¨¯¨`*·~-.¸-Nothing over here-,.-~*´¨¯¨`*·~-.¸
					</Typography>
				</Box>
			)}
		</Box>
	);
});

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
		title: 'Bed',
	},
	{
		img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
		title: 'Books',
	},
	{
		img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
		title: 'Sink',
	},
	{
		img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
		title: 'Kitchen',
	},
	{
		img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
		title: 'Blinds',
	},
	{
		img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
		title: 'Chairs',
	},
	{
		img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
		title: 'Laptop',
	},
	{
		img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
		title: 'Doors',
	},
	{
		img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
		title: 'Coffee',
	},
	{
		img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
		title: 'Storage',
	},
	{
		img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
		title: 'Candle',
	},
	{
		img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
		title: 'Coffee table',
	},
];
