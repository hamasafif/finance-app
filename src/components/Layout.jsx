import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar untuk desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar slide-in untuk mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 z-50 shadow-lg md:hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
