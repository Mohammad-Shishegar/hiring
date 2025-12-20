import { createContext, useContext, useState } from "react";

type StateContextType = {
  handleSetState: (value: any) => void;
  getState: () => any;
};

type StateProviderProps = {
  children: React.ReactNode;
};

const StateContext = createContext<undefined | StateContextType>(undefined);

const StateProvider = ({ children }: StateProviderProps) => {
  const [states, setStates] = useState();

  const handleSetState = (value: any) => {
    setStates(value);
  };

  const getState = () => states;

  return (
    <StateContext.Provider value={{ getState, handleSetState }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateManager = () => {
  const state = useContext(StateContext);
  if (state === undefined) throw Error("Use Context inside provider");
  return state;
};

export { useStateManager, StateProvider };
