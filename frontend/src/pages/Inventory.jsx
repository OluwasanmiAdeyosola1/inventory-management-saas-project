import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    productId: "",
    amount: "",
  });

  const fetchInventory = async () => {
    try {
      setError("");

      const response = await api.get("/inventory");

      setInventory(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load products."
      );
    }
  };

  useEffect(() => {
    fetchInventory();
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
    setSaving(true);

    try {
      await api.post("/inventory/add", {
        productId: formData.productId,
        amount: Number(formData.amount),
      });

      setFormData({
        productId: "",
        amount: "",
      });

      setShowForm(false);

      await fetchInventory();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not add stock."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveStock = async (productId) => {
    const amount = window.prompt(
      "Enter the amount of stock to remove:"
    );

    if (!amount) {
      return;
    }

    try {
      setError("");

      await api.post("/inventory/remove", {
        productId,
        amount: Number(amount),
      });

      await fetchInventory();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not remove stock."
      );
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/inventory/${productId}`);

      await fetchInventory();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not delete inventory."
      );
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
              <h1>Inventory</h1>
              <p>Monitor and manage your current stock levels.</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Stock"}
            </button>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {showForm && (
            <div className="card">
              <h2 className="form-title">Add Stock</h2>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Product *</label>

                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select a product
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
                  <label>Quantity to Add *</label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Adding Stock..." : "Add Stock"}
                </button>

              </form>
            </div>
          )}

          <div className="card">
            <div className="search-row">
              <input
                type="text"
                placeholder="Search inventory..."
                className="search-input"
              />

              <select className="filter-select">
                <option>All Stock</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Stock Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-state"
                    >
                      Loading inventory...
                    </td>
                  </tr>
                ) : inventory.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-state"
                    >
                      No inventory available.
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => {

                    const quantity = item.quantity || 0;

                    let status = "In Stock";

                    if (quantity === 0) {
                      status = "Out of Stock";
                    } else if (quantity <= 5) {
                      status = "Low Stock";
                    }

                    return (
                      <tr key={item._id}>

                        <td>
                          {item.product?.name ||
                            item.productId?.name ||
                            "-"}
                        </td>

                        <td>
                          {item.product?.sku ||
                            item.productId?.sku ||
                            "-"}
                        </td>

                        <td>
                          {quantity}
                        </td>

                        <td>
                          {item.product?.unit ||
                            item.productId?.unit ||
                            "pcs"}
                        </td>

                        <td>
                          <span className="status-badge">
                            {status}
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              handleRemoveStock(
                                item.product?._id ||
                                  item.productId?._id ||
                                  item.productId
                              )
                            }
                          >
                            Remove Stock
                          </button>

                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              handleDelete(
                                item.product?._id ||
                                  item.productId?._id ||
                                  item.productId
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Inventory;