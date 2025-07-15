export type Note = {
	id: string;
	title: string;
	body: string;
	date: number;
};

export type journalState = {
	isSaving: boolean;
	messageSaved: string;
	notes: Note[];
	activeNote: Note | null;
	imageURLs: string[];
};
