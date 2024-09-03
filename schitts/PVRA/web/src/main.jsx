import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AjouterClient from './pages/clients/AjouterClient.jsx'
import Clients from './pages/clients/Clients.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'clients',
    element: <Clients />
  },
  {
    path: 'ajouter-client',
    element: <AjouterClient/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
