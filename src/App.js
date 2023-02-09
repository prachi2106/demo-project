import Home from "./components/Home";
import {Routes,Route} from "react-router-dom";
import Admin from "./components/Admin";
import Employee from  "./components/Employee";
import EmployeePortal from "./components/EmployeePortal"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='admin' element={<Admin />}>
      </Route>
      <Route path='employee' element={<Employee />}>
      </Route>
      </Routes>

  );
}

export default App;
