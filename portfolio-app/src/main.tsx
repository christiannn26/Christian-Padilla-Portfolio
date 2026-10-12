import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts (byte-identical to the files Google Fonts serves)
import '@fontsource-variable/cormorant';
import '@fontsource-variable/montserrat';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
