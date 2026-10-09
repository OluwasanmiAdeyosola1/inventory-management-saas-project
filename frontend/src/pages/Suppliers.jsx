import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/suppliers",
        getConfig()
      );

      setSuppliers(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load suppliers."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Supplier name is required.");
      return;
    }

    try {
      setSaving(true);

      let response;

      if (editingId) {
        response = await axios.put(
          `http://localhost:3000/api/suppliers/${editingId}`,
          form,
          getConfig()
        );

        setSuppliers((prev) =>
          prev.map((supplier) =>
            supplier._id === editingId
              ? response.data.data
              : supplier
          )
        );

        setSuccess("Supplier updated successfully.");
      } else {
        response = await axios.post(
          "http://localhost:3000/api/suppliers",
          form,
          getConfig()
        );

        setSuppliers((prev) => [
          response.data.data,
          ...prev,
        ]);

        setSuccess("Supplier added successfully.");
      }

      resetForm();
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (backendErrors?.length) {
        setError(backendErrors.join(", "));
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to save supplier."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (supplier) => {
    setForm({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
    });

    setEditingId(supplier._id);

    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await axios.delete(
        `http://localhost:3000/api/suppliers/${id}`,
        getConfig()
      );

      setSuppliers((prev) =>
        prev.filter((supplier) => supplier._id !== id)
      );

      setSuccess("Supplier deleted successfully.");

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete supplier."
      );
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const searchText = search.toLowerCase();

    return (
      supplier.name?.toLowerCase().includes(searchText) ||
      supplier.email?.toLowerCase().includes(searchText) ||
      supplier.phone?.toLowerCase().includes(searchText) ||
      supplier.address?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <div className="page-container">

          <div className="page-header">
            <div>
              <h1>Suppliers</h1>
              <p>Manage your product suppliers.</p>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <div className="card">
            <h2>
              {editingId ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">

                <div className="form-group">
                  <label>Supplier Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter supplier name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="supplier@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Supplier"
                  : "Add Supplier"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="card">
            <div className="search-row">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="card">
              <p>Loading suppliers...</p>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="card empty-state">
              {search
                ? "No suppliers match your search."
                : "No suppliers found."}
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Supplier Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier._id}>
                      <td>{supplier.name}</td>
                      <td>{supplier.email || "—"}</td>
                      <td>{supplier.phone || "—"}</td>
                      <td>{supplier.address || "—"}</td>

                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleEdit(supplier)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(supplier._id)
                          }
                          style={{ marginLeft: "8px" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Suppliers;