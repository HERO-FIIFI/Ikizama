import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage } from './pages/HomePage'
import { PathPage } from './pages/PathPage'
import { resolveRoute } from './lib/routes'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>{resolveRoute(window.location.pathname) === 'path' ? <PathPage /> : <HomePage />}</StrictMode>,
)
