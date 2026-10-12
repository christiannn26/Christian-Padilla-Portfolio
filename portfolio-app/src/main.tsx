import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted Inter with optical sizing: the Display cut at headline sizes, the Text cut for body
import '@fontsource-variable/inter/opsz.css';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
