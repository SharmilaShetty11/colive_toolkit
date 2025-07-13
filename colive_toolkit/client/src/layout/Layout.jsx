import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-gray-800 dark:text-gray-100 transition-colors duration-500 ease-in-out">
      {/* Frosted Glass Header */}
        <Header />

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-8 transition-all duration-500 animate-fade-in-up">
        <Outlet />
      </main>

      {/* Footer */}
        <Footer />
    </div>
  );
};

export default Layout;