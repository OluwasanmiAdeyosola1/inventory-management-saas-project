import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Inventory SaaS</h2>
        <span>Management System</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/products" className="sidebar-link">
          Products
        </NavLink>

        <NavLink to="/suppliers" className="sidebar-link">
          Suppliers
        </NavLink>

        <NavLink to="/inventory" className="sidebar-link">
          Inventory
        </NavLink>

        <NavLink to="/movements" className="sidebar-link">
          Stock Movements
        </NavLink>

        <NavLink to="/sales" className="sidebar-link">
          Sales
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;     