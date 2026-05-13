import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, role, logout, isAdmin, isDosen } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Portfolio Dosen
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/" className="hover:text-blue-200 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-blue-200 transition">
                About
              </Link>
              <Link to="/portfolio" className="hover:text-blue-200 transition">
                Portfolio
              </Link>
              <Link to="/contact" className="hover:text-blue-200 transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 hover:text-blue-200 transition"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                )}
                {isDosen && (
                  <Link
                    to="/dosen/dashboard"
                    className="flex items-center gap-2 hover:text-blue-200 transition"
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                )}
                <span className="text-sm text-blue-200">
                  {user.email} ({role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
