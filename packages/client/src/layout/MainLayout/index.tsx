import DesktopSidebar from "src/layout/MainLayout/sidebar/DesktopSidebar";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./sidebar/index";

type MainLayoutType = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutType) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full fixed top-0 z-[100]">
        <Header />
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full mt-[100px]">{children}</div>
      </main>
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
