import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { AppContextType, AppProviderProps, AppState } from "./types";

export const appContext = createContext<AppContextType | null>(null);

const initialState: AppState = {
  // general
  isSidebarOpen: false,
  filters: {
    agent: "",
    calling: "",
  },

  // leaders
  leaders: [],
  isLeadersLoading: false,


  // groups
  groups: [],
  isGroupsLoading: false,

  // children
  children: [],
  isChildrenLoading: false,
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const state = useReducer(reducer, initialState);

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
