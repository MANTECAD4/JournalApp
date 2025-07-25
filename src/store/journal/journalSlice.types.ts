export interface NotePayload {
	body: string;
	title: string;
}
export interface Note extends NotePayload {
	id: string;
	date: number;
	imageURLs: string[];
}

export interface journalState {
	isLoading: boolean;
	isSaving: boolean;
	notes: Note[];
	activeNote: Note | null;
}
