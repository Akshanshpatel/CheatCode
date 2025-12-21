import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RoadMap from './pages/RoadMap'
import About from './pages/About'
import Practice from './pages/Practice'
import NotFound from './pages/NotFound'
import Login from './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'


const GoogleAuthWrapper=()=>{
    return(
        <GoogleOAuthProvider clientId='250275454878-b7qtn92r8os2otmr0eh438lki9tdsm6v.apps.googleusercontent.com'>
            <Login></Login>
        </GoogleOAuthProvider>
    )
}

const router=createBrowserRouter([
    {path:"/",element:<App/>},
    {path:"/about",element:<About/>},
    {path:"/practice",element:<Practice/>},
    {path:"/roadmap",element:<RoadMap/>},
    {path:"*",element:<NotFound/>},
    {path:"login",element:<GoogleAuthWrapper/>},
])


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/> 
)
