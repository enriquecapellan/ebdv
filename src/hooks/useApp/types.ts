import { IChild, IGroup } from "../../types/models";

export interface AppState {
  isSidebarOpen: boolean;

  // groups
  groups: IGroup[];
  isGroupsLoading: boolean;

  // children
  children: IChild[];
  isChildrenLoading: boolean;
}

export type AppContextType = [AppState, React.Dispatch<Action>];

export type AppProviderProps = {
  children: React.ReactNode;
};

type ToggleSidebarAction = { type: "TOGGLE_SIDEBAR" };

type SetChildrenAction = { type: "SET_CHILDREN"; payload: IChild[] };
type SetChildrenLoadingAction = {
  type: "SET_CHILDREN_LOADING";
  payload: boolean;
};

type SetGroupsAction = { type: "SET_GROUPS"; payload: IGroup[] };
type SetGroupsLoadingAction = { type: "SET_GROUPS_LOADING"; payload: boolean };

export type Action =
  | ToggleSidebarAction
  | SetChildrenAction
  | SetChildrenLoadingAction
  | SetGroupsAction
  | SetGroupsLoadingAction;
