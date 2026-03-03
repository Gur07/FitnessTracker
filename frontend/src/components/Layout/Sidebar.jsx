import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import {
  LayoutDashboard,
  Activity,
  PlusCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const linkStyle =
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all";
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await logoutUser();
        if (res.status === 200) {
            navigate("/login");
        }
    }
  return (
    <div className="w-64 bg-white shadow-lg p-6 hidden md:flex flex-col justify-between">

      {/* Top Section */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          FitTrack
        </h1>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Activity size={20} />
            Activities
          </NavLink>

          <NavLink
            to="/addactivity"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <PlusCircle size={20} />
            Add Activity
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <button className="flex items-center gap-3 text-red-500 hover:bg-red-100 px-4 py-3 rounded-xl transition" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;