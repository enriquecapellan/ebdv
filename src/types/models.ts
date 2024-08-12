export interface IGroup {
  id?: string;
  calling: string;
  agent: string;
  leader: string;
  assistant: string;
}

export interface IChild {
  id?: string;
  group: IGroup;
  name: string;
  age: number;
  photo: string;
  sex: "male" | "female";
}
