import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink
        activeClassName="active"
        className="item-link"
        to="/dashboard/users"
      >
        <i className="fa-solid fa-users"></i> Users
      </NavLink>
      <NavLink
        activeClassName="active"
        className="item-link"
        to="/dashboard/user/create"
      >
        <i className="fa-solid fa-user-plus"></i> New user
      </NavLink>
      <NavLink
        activeClassName="active"
        className="item-link"
        to="/dashboard/products"
      >
        <i className="fa-solid fa-swatchbook"></i> Products
      </NavLink>
      <NavLink
        activeClassName="active"
        className="item-link"
        to="/dashboard/product/create"
      >
        <i className="fa-regular fa-square-plus"></i>New Product
      </NavLink>
    </div>
  );
}
