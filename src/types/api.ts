import { ProjectSettings } from './data';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettings>;
}
