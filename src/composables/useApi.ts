import type { Api } from '../types/api';
import type { ProjectSettingsData } from '../types/data';
import useHttp from './useHttp';

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettingsData> {
    return request<ProjectSettingsData>(`${host}/project/settings/${projectHash}.json`);
  }

  return {
    getProjectSettings
  }
}
