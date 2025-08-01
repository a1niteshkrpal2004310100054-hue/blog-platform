import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <section className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="flex-grow p-8">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default Layout;
