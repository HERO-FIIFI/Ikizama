import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage } from './pages/HomePage'
import { PathPage } from './pages/PathPage'
import { resolveRoute } from './lib/routes'
import { applyMetadata } from './lib/metadata'
import './styles/global.css'

const route = resolveRoute(window.location.pathname)
applyMetadata(route)

createRoot(document.getElementById('root')!).render(<StrictMode>{route === 'path' ? <PathPage /> : <HomePage />}</StrictMode>)
