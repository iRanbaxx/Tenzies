import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No root element found');

createRoot(rootElement).render(<App />);
