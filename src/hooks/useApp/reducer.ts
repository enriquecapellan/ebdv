import { Action, AppState } from "./types";

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "SET_CHILDREN":
      return { ...state, children: action.payload };
    case "SET_CHILDREN_LOADING":
      return { ...state, isChildrenLoading: action.payload };
    case "SET_GROUPS":
      return { ...state, groups: action.payload };
    case "SET_ACTIVE_GROUP":
      return { ...state, activeGroup: action.payload };
    case "SET_ACTIVE_CHILD":
      return { ...state, activeChild: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_GROUPS_LOADING":
      return { ...state, isGroupsLoading: action.payload };
    case "SET_LEADERS":
      return { ...state, leaders: action.payload };
    case "SET_LEADERS_LOADING":
      return { ...state, isLeadersLoading: action.payload };
    case "SET_ACTIVE_LEADER":
      return { ...state, activeLeader: action.payload };
    case "SET_SPECIAL_AGENTS":
      return { ...state, specialAgents: action.payload };
    case "SET_SPECIAL_AGENTS_LOADING":
      return { ...state, isSpecialAgentsLoading: action.payload };
    case "SET_ACTIVE_SPECIAL_AGENT":
      return { ...state, activeSpecialAgent: action.payload };

    default:
      return state;
  }
}
