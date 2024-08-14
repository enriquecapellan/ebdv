import { IChild, IGroup, IFilters, ILeader, ISpecialAgent } from "../../types/models";

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

  // special agents
  specialAgents: ISpecialAgent[];
  isSpecialAgentsLoading: boolean;
  activeSpecialAgent: ISpecialAgent | null;
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
type SetActiveChildAction = {
  type: "SET_ACTIVE_CHILD";
  payload: IChild | null;
};

type SetGroupsAction = { type: "SET_GROUPS"; payload: IGroup[] };
type SetGroupsLoadingAction = { type: "SET_GROUPS_LOADING"; payload: boolean };
type SetActiveGroupAction = {
  type: "SET_ACTIVE_GROUP";
  payload: IGroup | null;
};

type SetSpecialAgentsAction = { type: "SET_SPECIAL_AGENTS"; payload: ISpecialAgent[] };
type SetSpecialAgentsLoadingAction = {
  type: "SET_SPECIAL_AGENTS_LOADING";
  payload: boolean;
};
type SetActiveSpecialAgentAction = {
  type: "SET_ACTIVE_SPECIAL_AGENT";
  payload: ISpecialAgent | null;
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

type setFiltersAction = {
  type: "SET_FILTERS";
  payload: IFilters;
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
  | SetActiveLeaderAction
  | SetSpecialAgentsAction
  | SetSpecialAgentsLoadingAction
  | SetActiveSpecialAgentAction;
