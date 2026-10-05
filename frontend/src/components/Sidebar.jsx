import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <h2>Inventory SaaS</h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/suppliers">Suppliers</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/movements">Stock Movements</NavLink>
        <NavLink to="/sales">Sales</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;      