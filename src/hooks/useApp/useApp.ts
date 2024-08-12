import { useContext } from "react";
import { appContext } from "./AppContext";
import { IChild, IGroup } from "../../types/models";
import { createChild, fetchChildren } from "../../services/db/children";
import { createGroup, fetchGroups } from "../../services/db/groups";
import { uploadFile } from "../../services/storage";

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
  async function loadChildren() {
    setChildrenLoading(true);
    const children = await fetchChildren();
    setChildren(children);
    setChildrenLoading(false);
  }

  async function addChild(child: IChild, image: File) {
    setChildrenLoading(true);
    const id = await createChild(child);
    await uploadFile(image, `children/${id}.jpg`);
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

  async function addGroup(group: IGroup) {
    setGroupsLoading(true);
    await createGroup(group);
    loadGroups();
  }

  function setGroups(groups: IGroup[] = []) {
    dispatch({ type: "SET_GROUPS", payload: groups });
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
      setGroupsLoading,
    },
  };
}
