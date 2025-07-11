import type { Api } from '../types/api';
import type { ProjectSettingsData, TranslationData } from '../types/data';
import type { Language } from '../types/translator';
import useHttp from './useHttp';

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettingsData> {
    return request<ProjectSettingsData>(`${host}/project/settings/${projectHash}.json`);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`${host}/translations/${language}.json`);
  }

  return {
    getProjectSettings,
    getTranslations
  }
}
