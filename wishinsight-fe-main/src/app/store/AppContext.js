"use client";
import { createContext, useContext, useMemo, useReducer } from "react";
import { AppReducer, initialState } from "./Reducers/AppReducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error(`useAppContext must be called within AppProvider`);
  }
  return context;
};
