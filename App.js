
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import User from './componets/getfeed/User';
import Add from './componets/addfeedback/Add';
import Edit from './componets/updatefeed/Edit';
import Optfeed from './componets/feedopt/Optfeed';
import Teamfeed from './componets/teamfeed/Teamfeed';



function App() {


  const route = createBrowserRouter([
    {
      path:"/user",
      element: <User/>,
    },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit/:id",
      element: <Edit/>,
    },

    {
      path:"/",
      element: <Optfeed/>,
    },

    {
      path:"/teamfeed",
      element: <Teamfeed/>,
    },

   

  
  ])


  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
