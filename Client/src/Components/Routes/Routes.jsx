import { BrowserRouter, Routes as Router,Route } from "react-router-dom";
import Registration from "../HeadFooter/Registration";
import Home from '../Pages/Home/Home';

function Routes() {
  return (
    <BrowserRouter>
        <Router>
            <Route path="/" element={<Registration/>}/>
            <Route path="/home" element={<Home/>}/>
        </Router>
    </BrowserRouter>
  )
}

export default Routes;