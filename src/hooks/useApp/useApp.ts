import { useContext } from "react";
import { appContext } from "./AppContext";
import { IChild, IGroup, IGroupsFilters } from "../../types/models";
import { createChild, fetchChildren } from "../../services/db/children";
import { createGroup, fetchGroups } from "../../services/db/groups";
import { fileToBase64 } from "../../utils";

export function useApp() {
  const context = useContext(appContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  const [state, dispatch] = context;

  // general actoins
  function toggleSidebar() {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }

  // children actions
  async function loadChildren(groupId?: string) {
    setChildrenLoading(true);
    const children = await fetchChildren(groupId);
    setChildren(children);
    setChildrenLoading(false);
  }

  async function addChild(child: IChild, photoFile: File) {
    setChildrenLoading(true);
    child.photo = await fileToBase64(photoFile);
    await createChild(child);
    loadChildren();
  }

  function setChildren(children: IChild[] = []) {
    dispatch({ type: "SET_CHILDREN", payload: children });
  }

  function setChildrenLoading(isLoading: boolean) {
    dispatch({ type: "SET_CHILDREN_LOADING", payload: isLoading });
  }

  // groups actions
  async function loadGroups() {
    setGroupsLoading(true);
    const groups = await fetchGroups();
    setGroups(groups);
    setGroupsLoading(false);
  }

  async function addGroup(
    group: IGroup,
    leaderPhoto: File,
    assistantPhoto: File | null
  ) {
    group.leader.photo = await fileToBase64(leaderPhoto);
    if (group.assistant && assistantPhoto) {
      group.assistant.photo = await fileToBase64(assistantPhoto);
    }
    setGroupsLoading(true);
    await createGroup(group);
    loadGroups();
  }

  function setGroups(groups: IGroup[] = []) {
    dispatch({ type: "SET_GROUPS", payload: groups });
  }

  function setGroupsFilters(filters: IGroupsFilters) {
    dispatch({ type: "SET_GROUPS_FILTERS", payload: filters });
  }

  function setGroupsLoading(isLoading: boolean) {
    dispatch({ type: "SET_GROUPS_LOADING", payload: isLoading });
  }

  return {
    state,
    actions: {
      toggleSidebar,
      addChild,
      loadChildren,
      setChildren,
      setChildrenLoading,
      loadGroups,
      addGroup,
      setGroups,
      setGroupsFilters,
      setGroupsLoading,
    },
  };
}
