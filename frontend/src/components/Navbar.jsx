import { Link } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <Squares2X2Icon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-surface-100 to-surface-300 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-surface-300">
                  {user.full_name || user.email}
                </span>
              </div>
            )}
            <button
              id="logout-button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-all cursor-pointer"
            >
              <ArrowRightOnRectangleIcon className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
