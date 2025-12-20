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
      <main className="flex-1 pt-36 px-5 ">
        <div className="flex flex-row justify-between h-full">
          <Sidebar>
            <DesktopSidebar />
          </Sidebar>
          {/* <main className="w-full min-h-full mb-16 lg:ml-8 lg:mr-24  -mt-[110px] lg:max-w-[calc(100vw-8rem)]">
            {children}
          </main> */}
        </div>
        {children}
      </main>
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
