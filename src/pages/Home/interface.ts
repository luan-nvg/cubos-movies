interface IProject {
  id: string;
  name: string;
  descr: string;
  repo: string | null;
}

interface IProject_Data {
  data: IProject[];
}

export type { IProject, IProject_Data };
