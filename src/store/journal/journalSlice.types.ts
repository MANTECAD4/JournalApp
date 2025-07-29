export interface NoteImage {
	name: string;
	secure_url: string;
	id: string;
}
export interface NotePayload {
	body: string;
	title: string;
}
export interface Note extends NotePayload {
	id: string;
	date: number;
	imageURLs: NoteImage[];
}

export interface journalState {
	isLoading: boolean;
	isSaving: boolean;
	notes: Note[];
	activeNote: Note | null;
}
