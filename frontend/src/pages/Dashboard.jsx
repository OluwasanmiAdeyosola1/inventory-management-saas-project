import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [productsResponse, inventoryResponse] =
          await Promise.all([
            api.get("/products"),
            api.get("/inventory"),
          ]);

        setProducts(productsResponse.data.data || []);
        setInventory(inventoryResponse.data.data || []);

        // Supplier data will be loaded when the supplier
        // backend endpoint is available.
        setSuppliers([]);
      } catch (error) {
        console.log(
          "Dashboard data could not be loaded:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalProducts = products.length;

  const totalInventory = inventory.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const lowStockItems = inventory.filter(
    (item) => {
      const quantity = item.quantity || 0;
      return quantity > 0 && quantity <= 5;
    }
  ).length;

  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <div className="page-container">

          <div className="page-header">
            <h1>Dashboard</h1>
            <p>
              Welcome to your inventory management dashboard.
            </p>
          </div>

          <div className="dashboard-grid">

            <div className="card dashboard-card">
              <h3>Total Products</h3>

              <p className="dashboard-number">
                {loading ? "..." : totalProducts}
              </p>
            </div>

            <div className="card dashboard-card">
              <h3>Total Suppliers</h3>

              <p className="dashboard-number">
                {loading ? "..." : suppliers.length}
              </p>
            </div>

            <div className="card dashboard-card">
              <h3>Total Stock</h3>

              <p className="dashboard-number">
                {loading ? "..." : totalInventory}
              </p>
            </div>

            <div className="card dashboard-card">
              <h3>Low Stock Items</h3>

              <p className="dashboard-number">
                {loading ? "..." : lowStockItems}
              </p>
            </div>

          </div>

          <div className="card dashboard-section">
            <h2>Inventory Overview</h2>

            <p>
              Use the sidebar to manage your products,
              suppliers, inventory, stock movements and sales.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;