import type { CloundinaryResponse } from '../../apis/Cloudinary.types';

export const fileUpload = async (file: File) => {
	const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dkfg9qnrm/image/upload`;
	const formData = new FormData();
	formData.append('upload_preset', 'journal-app');
	formData.append('file', file);

	try {
		const rawData = await fetch(cloudinaryUrl, {
			method: 'POST',
			body: formData,
		});
		const cloudResp: CloundinaryResponse = await rawData.json();
		return {
			secure_url: cloudResp.secure_url,
			id: cloudResp.asset_id,
			name: cloudResp.original_filename,
		};
	} catch (error) {
		console.warn(error);
		return {
			secure_url: 'No url',
			id: 'No id',
			name: 'No name',
		};
	}
};
