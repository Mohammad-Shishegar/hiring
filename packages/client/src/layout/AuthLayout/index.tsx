import AuthHeader from "./AuthHeader";

type MainLayoutType = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: MainLayoutType) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full fixed top-0 z-[100]">
        <AuthHeader />
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full mt-[100px]">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
