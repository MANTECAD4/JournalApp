import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../../src/helpers/journal/fileUpload';

cloudinary.config({
	cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.VITE_CLOUDINARY_API_KEY,
	api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
	secure: true,
});

describe('fileUpload.ts helper', () => {
	it('uploads files succesfully into cloudinary', async () => {
		const imgUrl =
			'https://images.ctfassets.net/hrltx12pl8hq/01rJn4TormMsGQs1ZRIpzX/16a1cae2440420d0fd0a7a9a006f2dcb/Artboard_Copy_231.jpg?fit=fill&w=480&h=400';
		const resp = await fetch(imgUrl);

		const blob = await resp.blob();
		const file = new File([blob], 'test-image.jpg');

		const imageInstance = await fileUpload(file);
		expect(imageInstance).toEqual(
			expect.objectContaining({
				secure_url: expect.any(String),
				id: expect.any(String),
				name: expect.any(String),
			})
		);
		await cloudinary.api.delete_resources([imageInstance.id]);
	});
	it('throws error message', async () => {
		try {
			const file = new File([], 'test-image.jpg');

			const imageInstance = await fileUpload(file);
			throw new Error("Didn't throw error message");
		} catch (error: any) {
			expect(error.message).toContain('image not uploaded');
		}
	});
});
