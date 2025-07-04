import { Api } from '../types/api';
import { ProjectSettings } from '../types/data';
import useHttp from './useHttp'

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettings> {
    return request<ProjectSettings>(`${host}/project/settings/${projectHash}.json`);
  }

  return {
    getProjectSettings
  }
}
