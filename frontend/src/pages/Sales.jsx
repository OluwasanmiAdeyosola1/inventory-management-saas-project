import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load products."
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await api.post("/sales", {
        productId: formData.productId,
        quantity: Number(formData.quantity),
      });

      const newSale = response.data.data;

      setSales((previousSales) => [
        newSale,
        ...previousSales,
      ]);

      setFormData({
        productId: "",
        quantity: "",
      });

      setShowForm(false);

      setSuccess("Sale recorded successfully.");

      await fetchProducts();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not record sale."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <div className="page-container">

          <div className="page-header page-header-row">
            <div>
              <h1>Sales</h1>
              <p>Record your sales transactions.</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setError("");
                setSuccess("");
              }}
            >
              {showForm ? "Cancel" : "+ Record Sale"}
            </button>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}

          {showForm && (
            <div className="card">
              <h2 className="form-title">Record Sale</h2>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Product *</label>

                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    disabled={loadingProducts}
                  >
                    <option value="">
                      {loadingProducts
                        ? "Loading products..."
                        : "Select a product"}
                    </option>

                    {products.map((product) => (
                      <option
                        key={product._id}
                        value={product._id}
                      >
                        {product.name} ({product.sku})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity *</label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity sold"
                    min="1"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Recording Sale..."
                    : "Record Sale"}
                </button>

              </form>
            </div>
          )}

          <div className="card">
            <div className="search-row">
              <input
                type="text"
                placeholder="Search sales..."
                className="search-input"
              />

              <select className="filter-select">
                <option>All Sales</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Selling Price</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="empty-state"
                    >
                      No sales recorded yet.
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale._id}>
                      <td>
                        {sale.product?.name ||
                          sale.productId?.name ||
                          "-"}
                      </td>

                      <td>
                        {sale.quantity || "-"}
                      </td>

                      <td>
                        {sale.sellingPrice ?? "-"}
                      </td>

                      <td>
                        {sale.totalAmount ??
                          sale.total ??
                          "-"}
                      </td>

                      <td>
                        {sale.createdAt
                          ? new Date(
                              sale.createdAt
                            ).toLocaleDateString()
                          : "Today"}
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

export default Sales;