import { FirebaseError } from 'firebase/app';
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
		if (!rawData.ok) throw new Error('Error: image not uploaded');

		const cloudResp: CloundinaryResponse = await rawData.json();
		return {
			secure_url: cloudResp.secure_url,
			id: cloudResp.public_id,
			name: cloudResp.original_filename,
		};
	} catch (error: any) {
		// console.warn(error.message);
		throw new Error('Error: image not uploaded');
	}
};
