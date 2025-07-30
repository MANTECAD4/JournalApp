import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import { journalStore } from './store/store';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<Provider store={journalStore}>
		<HashRouter>
			<JournalApp />
		</HashRouter>
	</Provider>
	// </StrictMode>
);
