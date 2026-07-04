import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Academic from './pages/Academic'
import About from './pages/About'
import Practice from './pages/Practice'
import NotFound from './pages/NotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Wordle from './pages/Wordle'
import ThemeProvider from './utils/ThemeContext'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/wordle", element: <Wordle /> },
  { path: "/about", element: <About /> },
  { path: "/practice", element: <Practice /> },
  { path: "/academic", element: <Academic /> },
  { path: "*", element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </GoogleOAuthProvider>
)
