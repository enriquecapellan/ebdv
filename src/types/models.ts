interface IPerson {
  name: string;
  photo: string;
}

export interface IGroupsFilters {
  agent?: string;
  calling: string;
}

export interface IGroup {
  id?: string;
  calling: string;
  agent: string;
  leader: IPerson;
  assistant: IPerson;
}

export interface IChild extends IPerson {
  id?: string;
  group: IGroup;
  age: number;
  sex: "male" | "female";
}
