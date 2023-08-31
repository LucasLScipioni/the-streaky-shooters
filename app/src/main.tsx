import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Animations from './views/Animations.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "animations",
    element: <Animations />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
