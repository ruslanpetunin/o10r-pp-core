import type { ProjectSettingsData } from './data';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettingsData>;
}
