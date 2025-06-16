import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp';
import { HashRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<JournalApp />
		</HashRouter>
	</StrictMode>
);
