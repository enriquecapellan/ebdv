import { useContext } from "react";
import { appContext } from "./AppContext";
import { IChild, IGroup, IFilters, ILeader } from "../../types/models";
import { createChild, fetchChildren } from "../../services/db/children";
import { createGroup, fetchGroups } from "../../services/db/groups";
import { updloadImage } from "../../services/db/images";
import { createLeader, fetchLeaders } from "../../services/db/leaders";

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

  function setFilters(filters: IFilters) {
    dispatch({ type: "SET_FILTERS", payload: filters });
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
    const id = await createChild(child);
    updloadImage(photoFile, `children.${id}.jpg`);
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
    setGroupsLoading(true);
    const id = await createGroup(group);
    updloadImage(leaderPhoto, `groups.${id}.leader.jpg`);
    if (assistantPhoto)
      updloadImage(assistantPhoto, `groups.${id}.assistant.jpg`);

    loadGroups();
  }

  function setGroups(groups: IGroup[] = []) {
    dispatch({ type: "SET_GROUPS", payload: groups });
  }

  function setActiveGroup(group: IGroup | null) {
    dispatch({ type: "SET_ACTIVE_GROUP", payload: group });
  }

  function setGroupsLoading(isLoading: boolean) {
    dispatch({ type: "SET_GROUPS_LOADING", payload: isLoading });
  }

  // leaders actions
  async function addLeader(leader: ILeader, photo: File) {
    setGroupsLoading(true);
    const id = await createLeader(leader);
    updloadImage(photo, `leaders.${id}.jpg`);

    loadLeaders();
  }

  async function loadLeaders() {
    setGroupsLoading(true);
    const leaders = await fetchLeaders();
    setLeaders(leaders);
    setGroupsLoading(false);
  }

  function setLeaders(leaders: ILeader[] = []) {
    dispatch({ type: "SET_LEADERS", payload: leaders });
  }

  function setActiveLeader(leader: ILeader | null) { 
    dispatch({ type: "SET_ACTIVE_LEADER", payload: leader });
  }

  function setLeadersLoading(isLoading: boolean) {
    dispatch({ type: "SET_LEADERS_LOADING", payload: isLoading });
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
      setActiveGroup,
      setFilters,
      setGroupsLoading,
      addLeader,
      loadLeaders,
      setLeaders,
      setActiveLeader,
      setLeadersLoading,
    },
  };
}
