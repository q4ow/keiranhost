import { Link, Outlet } from 'react-router-dom';
import { LuFiles, LuShield } from 'react-icons/lu';
import { motion } from 'framer-motion';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="border-b border-slate-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center space-x-2">
                <LuFiles className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">KeiranHost</span>
              </Link>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link
                to="/privacy"
                className="flex items-center space-x-1 text-slate-300 transition-colors hover:text-white"
              >
                <LuShield className="h-4 w-4" />
                <span>Privacy</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
