import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/Home';
// import ShopDashboard from '../Components/ShopDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <ShopDashboard />,
    element: <Home />,
  },
]);
