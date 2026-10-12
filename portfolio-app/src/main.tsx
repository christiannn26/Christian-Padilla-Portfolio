import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts: Bodoni Moda with optical sizing for display, Mona Sans for text
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/mona-sans';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
