import { Link, Outlet } from 'react-router-dom';
import { Files, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center space-x-2">
                <Files className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">KeiranHost</span>
              </Link>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link
                to="/privacy"
                className="text-slate-300 hover:text-white transition-colors flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}