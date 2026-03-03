import Sidebar from "./sidebar";
import Navbar from "./navbar";
    
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 to-blue-100 flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout