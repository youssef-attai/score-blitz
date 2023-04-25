import ReactDOM from 'react-dom/client'
import './css/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
