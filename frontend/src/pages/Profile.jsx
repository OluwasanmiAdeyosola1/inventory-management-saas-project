import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return {};
      }
    }

    return {};
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <div className="page-container">

          <div className="page-header">
            <div>
              <h1>Profile</h1>
              <p>View and manage your account information.</p>
            </div>
          </div>

          <div className="card profile-card">
            <div className="profile-card-header">
              <div className="profile-avatar">
                {(user.name || user.fullName || user.firstName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <h2>
                  {user.name ||
                    user.fullName ||
                    user.firstName ||
                    "User"}
                </h2>
                <p>{user.email || "Email not available"}</p>
              </div>
            </div>

            <div className="profile-divider"></div>

            <h3 className="profile-section-title">
              Account Information
            </h3>

            <div className="profile-info">
              <div className="profile-field">
                <span>Name</span>
                <strong>
                  {user.name ||
                    user.fullName ||
                    user.firstName ||
                    "Not available"}
                </strong>
              </div>

              <div className="profile-field">
                <span>Email</span>
                <strong>{user.email || "Not available"}</strong>
              </div>

              <div className="profile-field">
                <span>Role</span>
                <strong>{user.role || "Not available"}</strong>
              </div>

              <div className="profile-field">
                <span>Store</span>
                <strong>
                  {user.storeName ||
                    user.store?.name ||
                    "Not available"}
                </strong>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;