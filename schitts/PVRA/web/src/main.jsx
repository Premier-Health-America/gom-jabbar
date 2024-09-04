import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AjouterClient from './pages/clients/AjouterClient.jsx'
import Clients from './pages/clients/Clients.jsx'
import NotFound from './pages/NotFound.jsx'
import AjouterProduit from './pages/produits/AjouterProduits.jsx'
import ModifierProduit from './pages/produits/ModifierProduit.jsx'
import Produits from './pages/produits/Produits.jsx'

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
    element: <AjouterClient />
  },
  {
    path: 'ajouter-produit',
    element: <AjouterProduit />
  },
  {
    path: 'produits',
    element: <Produits />
  },
  {
    path: 'produits',
    children: [
      {
        path: 'modifier',
        children: [
          {
            path: ':id',
            element: <ModifierProduit />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
