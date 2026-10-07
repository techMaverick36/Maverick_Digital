import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/plus-jakarta-sans'
import './index.css'
import App from './App.jsx'

// Scroll reveals only arm when motion is welcome and observable; otherwise everything renders in place.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion')
}

// Cursor light: any .spot card tracks the pointer so a soft azure glow follows it (fine pointers only).
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('pointermove', (e) => {
    const el = e.target instanceof Element && e.target.closest('.spot')
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, { passive: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
