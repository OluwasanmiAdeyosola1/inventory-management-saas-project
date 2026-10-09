import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovements = async () => {
    try {
      setError("");

      const response = await api.get("/stock-movements");

      setMovements(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load stock movements."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <div className="page-container">

          <div className="page-header">
            <div>
              <h1>Stock Movements</h1>
              <p>Track stock coming into and leaving your inventory.</p>
            </div>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="card">
            <div className="search-row">
              <input
                type="text"
                placeholder="Search stock movements..."
                className="search-input"
              />

              <select className="filter-select">
                <option>All Movements</option>
                <option>Stock In</option>
                <option>Stock Out</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Reference</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      Loading stock movements...
                    </td>
                  </tr>
                ) : movements.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No stock movements available.
                    </td>
                  </tr>
                ) : (
                  movements.map((movement) => (
                    <tr key={movement._id}>
                      <td>
                        {movement.product?.name ||
                          movement.productId?.name ||
                          "-"}
                      </td>

                      <td>
                        {movement.type ||
                          movement.movementType ||
                          "-"}
                      </td>

                      <td>
                        {movement.quantity ??
                          movement.amount ??
                          "-"}
                      </td>

                      <td>
                        {movement.createdAt
                          ? new Date(
                              movement.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        {movement.reference ||
                          movement.reason ||
                          "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

export default StockMovements;