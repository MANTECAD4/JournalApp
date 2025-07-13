type ErrorList = Record<string, string>;
// type ErrorList = {
//      [key:string]:number
// }
/**
 * Returns the message related to an specific error
 * @param {String} code Firebase auth API code error
 * @returns
 */
export const getError = (code: string) => {
	const errors: ErrorList = {
		'auth/email-already-in-use': 'Este correo ya está registrado.',
		'auth/phone-number-already-exists':
			'Este número de teléfono ya está en uso.',
		'auth/user-not-found': 'No se encontró una cuenta con este correo.',
		'auth/too-many-requests':
			'Demasiados intentos fallidos. Intenta nuevamente más tarde.',
		'auth/invalid-password': 'La contraseña es incorrecta o inválida.',
		'auth/invalid-phone-number':
			'El número de teléfono ingresado no es válido.',
		'auth/invalid-photo-url': 'La URL de la foto no es válida.',
		'auth/invalid-credential': 'Credenciales inválidas.',
	};

	if (!errors[code]) {
		console.warn(code);
		return 'Oops! Something went wrong. Try again.';
	}
	return errors[code];
};
