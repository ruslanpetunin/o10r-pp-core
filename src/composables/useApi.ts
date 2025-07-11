import type { Api } from '../types/api';
import type { ProjectSettingsData } from '../types/data';
import type { Language, Translations } from '../types/translation';
import useHttp from './useHttp';

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettingsData> {
    return request<ProjectSettingsData>(`${host}/project/settings/${projectHash}.json`);
  }

  async function getTranslations(language: Language): Promise<Translations> {
    return request<Translations>(`${host}/translations/${language}`);
  }

  return {
    getProjectSettings,
    getTranslations
  }
}
