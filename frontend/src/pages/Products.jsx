import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    category: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    lowStockAlert: "",
    unit: "",
  });

  const fetchProducts = async () => {
    try {
      setError("");

      const response = await api.get("/products");

      setProducts(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load products."
      );
    } finally {
      setLoading(false);
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
    setSaving(true);

    try {
      await api.post("/products", {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        category: formData.category || "General",
        buyingPrice: Number(formData.buyingPrice),
        sellingPrice: Number(formData.sellingPrice),
        quantity: formData.quantity
          ? Number(formData.quantity)
          : 0,
        lowStockAlert: formData.lowStockAlert
          ? Number(formData.lowStockAlert)
          : 5,
        unit: formData.unit || "pcs",
      });

      setFormData({
        name: "",
        sku: "",
        description: "",
        category: "",
        buyingPrice: "",
        sellingPrice: "",
        quantity: "",
        lowStockAlert: "",
        unit: "",
      });

      setShowForm(false);

      await fetchProducts();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not create product."
      );
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (productId) => {
    try {
      setError("");

      await api.delete(`/products/${productId}`);

      await fetchProducts();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not delete product."
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
              <h1>Products</h1>
              <p>Manage the products in your inventory.</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Product"}
            </button>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {showForm && (
            <div className="card">
              <h2 className="form-title">Add New Product</h2>

              <form onSubmit={handleSubmit}>

                <div className="product-form-grid">

                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>SKU *</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="e.g. SKU-001"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Food"
                    />
                  </div>

                  <div className="form-group">
                    <label>Unit</label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      placeholder="e.g. pcs"
                    />
                  </div>

                  <div className="form-group">
                    <label>Buying Price *</label>
                    <input
                      type="number"
                      name="buyingPrice"
                      value={formData.buyingPrice}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Selling Price *</label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Low Stock Alert</label>
                    <input
                      type="number"
                      name="lowStockAlert"
                      value={formData.lowStockAlert}
                      onChange={handleChange}
                      placeholder="5"
                      min="0"
                    />
                  </div>

                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional product description"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Product"}
                </button>

              </form>
            </div>
          )}

          <div className="card">
            <div className="search-row">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />

              <select className="filter-select">
                <option>All Categories</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Buying Price</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.category}</td>
                      <td>{product.buyingPrice}</td>
                      <td>{product.sellingPrice}</td>
                      <td>{product.quantity}</td>
                      <td>
                       <button
                     className="btn btn-secondary"
                      onClick={() => handleDelete(product._id)}
>
                       Delete
                      </button>
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

export default Products; 