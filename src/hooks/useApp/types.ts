import { IChild, IGroup, IFilters, ILeader } from "../../types/models";

export interface AppState {
  isSidebarOpen: boolean;
  filters: IFilters;

  // groups
  groups: IGroup[];
  isGroupsLoading: boolean;
  activeGroup: IGroup | null;

  // groups
  leaders: ILeader[];
  isLeadersLoading: boolean;
  activeLeader: ILeader | null;

  // children
  children: IChild[];
  isChildrenLoading: boolean;
  activeChild: IChild | null;
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
type SetActiveChildAction = { type: "SET_ACTIVE_CHILD"; payload: IChild | null };

type SetGroupsAction = { type: "SET_GROUPS"; payload: IGroup[] };
type SetGroupsLoadingAction = { type: "SET_GROUPS_LOADING"; payload: boolean };
type setFiltersAction = {
  type: "SET_FILTERS";
  payload: IFilters;
};

type SetActiveGroupAction = {
  type: "SET_ACTIVE_GROUP";
  payload: IGroup | null;
};

type SetLeadersAction = { type: "SET_LEADERS"; payload: ILeader[] };
type SetLeadersLoadingAction = {
  type: "SET_LEADERS_LOADING";
  payload: boolean;
};
type SetActiveLeaderAction = {
  type: "SET_ACTIVE_LEADER";
  payload: ILeader | null;
};

export type Action =
  | ToggleSidebarAction
  | SetChildrenAction
  | SetActiveChildAction
  | SetChildrenLoadingAction
  | SetGroupsAction
  | SetActiveGroupAction
  | SetGroupsLoadingAction
  | setFiltersAction
  | SetLeadersAction
  | SetLeadersLoadingAction
  | SetActiveLeaderAction;
