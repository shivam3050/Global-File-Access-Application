import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { RouterProvider } from 'react-router-dom'
//below is because routes needs to be defined in main file
import { myUserRouter } from "./routes/userRoutes.routes.jsx"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myUserRouter} />
  </StrictMode>,
)

// main.jsx
