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
    case "SET_GROUPS_FILTERS":
      return { ...state, groupsFilters: action.payload };
    case "SET_GROUPS_LOADING":
      return { ...state, isGroupsLoading: action.payload };
    default:
      return state;
  }
}
