import {createBrowserRouter} from 'react-router-dom'
import Main from '../Main/Main';
import Registraion from '../HeadFooter/Loin signup/Registration'
import Home from '../Pages/Home/Home';
import Courses from '../Pages/Courses/Courses';
import Students from '../Pages/Students/Students';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Registraion/>,
      },{
        path: "/home",
        element: <Home />
      },{
        path:"/course",
        element: <Courses/>
      },{
        path:"/students",
        element: <Students />
      }
    ],
  },
]);