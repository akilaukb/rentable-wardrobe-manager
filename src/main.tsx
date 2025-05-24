
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// For testing purposes - simulate logged in admin user
localStorage.setItem('auth_token', 'test_token');
localStorage.setItem('user_role', 'admin');

createRoot(document.getElementById("root")!).render(<App />);
