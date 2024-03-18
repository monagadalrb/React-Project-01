import { Route, Routes } from "react-router-dom";
// Dashboard
import Dashboard from "./Pages/Dashboard/Dashboard";
// Users
import Users from "./Pages/Dashboard/Users/Users";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import UpdateUsers from "./Pages/Dashboard/Users/UpdateUsers";
//Products
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
// Website
import Home from "./Pages/Website/Home";
// Auth
import Login from "./Pages/Website/Auth/Login";
import SignUp from "./Pages/Website/Auth/SignUp";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        {/*Global Routes*/}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/*Protected Routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUsers />} />
              <Route path="user/create" element={<CreateUser />} />

              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/create" element={<NewProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
