import { useContext } from "react";
import { appContext } from "./AppContext";
import {
  IChild,
  IGroup,
  IFilters,
  ILeader,
  ISpecialAgent,
} from "../../types/models";
import {
  createChild,
  fetchChildren,
  updateChild,
} from "../../services/db/children";
import {
  createGroup,
  fetchGroups,
  updateGroup,
} from "../../services/db/groups";
import { updloadImage } from "../../services/db/images";
import { createLeader, fetchLeaders } from "../../services/db/leaders";
import {
  createSpecialAgent,
  fetchSpecialAgents,
  updateSpecialAgent,
} from "../../services/db/special-agents";

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

  async function editChild(child: IChild, photo: File | null) {
    setGroupsLoading(true);
    if (photo) updloadImage(photo, `children.${child.id}.jpg`);
    updateChild(child);

    loadChildren();
  }

  function setChildren(children: IChild[] = []) {
    dispatch({ type: "SET_CHILDREN", payload: children });
  }

  function setActiveChild(child: IChild | null) {
    dispatch({ type: "SET_ACTIVE_CHILD", payload: child });
  }

  function setChildrenLoading(isLoading: boolean) {
    dispatch({ type: "SET_CHILDREN_LOADING", payload: isLoading });
  }

  // special agents actions
  async function loadSpecialAgents() {
    setSpecialAgentsLoading(true);
    const specialAgents = await fetchSpecialAgents();
    setSpecialAgents(specialAgents);
    setSpecialAgentsLoading(false);
  }

  async function addSpecialAgent(specialAgent: ISpecialAgent, photoFile: File) {
    setSpecialAgentsLoading(true);
    const id = await createSpecialAgent(specialAgent);
    updloadImage(photoFile, `special-agents.${id}.jpg`);
    loadSpecialAgents();
  }

  async function editSpecialAgent(
    specialAgent: ISpecialAgent,
    photo: File | null
  ) {
    setGroupsLoading(true);
    if (photo) updloadImage(photo, `special-agents.${specialAgent.id}.jpg`);
    updateSpecialAgent(specialAgent);

    loadSpecialAgents();
  }

  function setSpecialAgents(specialAgents: ISpecialAgent[] = []) {
    dispatch({ type: "SET_SPECIAL_AGENTS", payload: specialAgents });
  }

  function setActiveSpecialAgent(specialAgent: ISpecialAgent | null) {
    dispatch({ type: "SET_ACTIVE_SPECIAL_AGENT", payload: specialAgent });
  }

  function setSpecialAgentsLoading(isLoading: boolean) {
    dispatch({ type: "SET_SPECIAL_AGENTS_LOADING", payload: isLoading });
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

  async function editGroup(
    group: IGroup,
    leaderPhoto: File | null,
    assistantPhoto: File | null
  ) {
    setGroupsLoading(true);
    if (leaderPhoto) updloadImage(leaderPhoto, `groups.${group.id}.leader.jpg`);
    if (assistantPhoto)
      updloadImage(assistantPhoto, `groups.${group.id}.assistant.jpg`);
    updateGroup(group);

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
      editChild,
      setActiveChild,
      setChildrenLoading,

      loadGroups,
      editGroup,
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

      addSpecialAgent,
      loadSpecialAgents,
      editSpecialAgent,
      setSpecialAgents,
      setActiveSpecialAgent,
      setSpecialAgentsLoading,
    },
  };
}
