import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import RestaurantMenu from './src/components/RestaurantMenu';
import About from './src/components/About';
import Error from './src/components/Error';
import Header from './src/components/Header';
import Contact from './src/components/Contact';
import Body from './src/components/Body';

const App = ()=>{
    return(
        <div>
            <Header/>
            <Outlet/>
            
        </div>
        
    )
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        
        children:[  
          {
            path:"/",
            element:<Body/>,            
          },
           
          {
            path:"/about",
            element:<About/>,            
          },
          {
            path:"/contact",
            element:<Contact/>,            
          },
          {
            path : "/restaurants/:resId",
             element:<RestaurantMenu/>,
          },   

        ],
        errorElement:<Error/>
    },  
]);
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={appRouter}/>);