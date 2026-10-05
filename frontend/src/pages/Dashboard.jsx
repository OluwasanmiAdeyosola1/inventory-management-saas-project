import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>
      <Sidebar />

      <main>
        <Navbar />

        <section>
          <h2>Dashboard</h2>
          <p>Welcome to your inventory management dashboard.</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;