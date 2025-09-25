import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';

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
                {
                    path:"/c/:id",
                    element: <ChatPage/>,
                    errorElement:<ErrorPage/>,
                }
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
