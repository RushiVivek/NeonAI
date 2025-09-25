import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children:[
                {
                    path:"/",
                    element: <Home/>,
                    errorElement:<ErrorPage/>,
                },
            ]
        },

    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
