import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster
            position='top-center'
            containerStyle={{ marginTop: '1rem' }}
            toastOptions={{
                //Default options
                duration: 2000,
                removeDelay: 500,
                style: {
                    background: '#27272a', // zinc-800
                    color: '#fff',
                    border: '1px solid #3f3f46', // zinc-700
                    fontWeight: 'semibold',
                    marginTop: "5px",
                },
                // Default options for specific types
                success: {
                    duration: 2000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                    style: {
                        border: '1px solid green',
                    }
                },
                error: {
                    duration: 2000,
                    style: {
                        border: '1px solid red',
                    }
                }
            }}
        />
        <App />
    </StrictMode>,
)
