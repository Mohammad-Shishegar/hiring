type MainLayoutType = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: MainLayoutType) => {
  return <div>{children}</div>;
};

export default AuthLayout;
