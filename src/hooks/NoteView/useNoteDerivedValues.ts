import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useMemo, useRef } from 'react';

/**
 * Required note values that are not directly-related to an important process
 * @returns
 */
export const useNoteDerivedValues = () => {
	const { activeNote } = useSelector((state: RootState) => state.journal);
	// ========= Derived Values =========
	const styledDate = useMemo(() => {
		return new Date(activeNote!.date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
		});
	}, [activeNote]);

	const fileInputRef = useRef<HTMLInputElement>(null);
	return {
		fileInputRef,
		styledDate,
	};
};
