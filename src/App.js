import Home from "./components/Home";
import {Routes,Route} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Employee from  "./components/Employee/Employee";
import EmployeePortal from "./components/Admin/EmployeePortal/EmployeePortal";
import ItemPortal from "./components/Admin/ItemPortal/ItemPortal";

export const config = {
  endpoint : `https://63e5bc6f7eef5b2233785df2.mockapi.io/api/v1`
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='admin' element={<Admin />}></Route>
      <Route path="admin/employeePortal" element={<EmployeePortal/>}></Route>
      <Route path="admin/ItemPortal" element={<ItemPortal/>}></Route>
      <Route path='employee' element={<Employee />}>
      </Route>
      </Routes>

  );
}

export default App;
