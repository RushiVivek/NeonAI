import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
        },

    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
