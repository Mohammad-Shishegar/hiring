import Button from "#base/src/components/button";
import { useAuth } from "#base/src/helpers/contexts/AuthContext";
import React from "react";

const Login = () => {
  const fakeUser = {
    name: "ali",
  };

  const { setToken } = useAuth();
  const handleLogin = () => {
    setToken("token", "token");
  };

  return (
    <div>
      <Button onClick={() => handleLogin()}>Login</Button>
    </div>
  );
};

export default Login;
