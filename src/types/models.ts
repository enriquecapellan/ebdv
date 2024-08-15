export interface IFilters {
  agent?: string;
  calling: string;
}

export interface IGroup {
  id?: string;
  calling: string;
  agent: string;
  leader: string;
  leaderPhoto?: string;
  assistant: string;
  assistantPhoto?: string;
  seconds?: number;
}

export interface ILeader {
  id?: string;
  name: string;
  agent: string;
  photo?: string;
}

export interface IChild {
  id?: string;
  photo?: string;
  name: string;
  group: IGroup;
  age: number;
  sex: "Niño" | "Niña";
}


export interface ISpecialAgent {
  id?: string;
  name: string;
  position: string;
  photo?: string;
}