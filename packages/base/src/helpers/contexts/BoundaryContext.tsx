import { Children, createContext, useContext, useState } from "react";

type ErrorContextType = {
  hasError: boolean;
  error: Error | null;
  setError: (erorr: Error) => void;
  resetError: () => void;
};

type ErrorProvider = {
  children: React.ReactNode;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

const ErrorProvider = ({ children }: ErrorProvider) => {
  const [hasError, setHasError] = useState(false);
  const [error, setErrorState] = useState<Error | null>(null);

  const setError = (error: Error) => {
    setHasError(true);
    setErrorState(error);
  };

  const resetError = () => {
    setHasError(false);
    setErrorState(null);
  };

  return (
    <ErrorContext.Provider value={{ hasError, error, setError, resetError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useErrorContext = () => {
  const error = useContext(ErrorContext);
  if (!error) throw Error("Use Context inside provider");
  return error;
};

export { useErrorContext, ErrorProvider };
