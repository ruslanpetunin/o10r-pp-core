import type { ProjectSettingsData, TranslationData } from './data';
import type { Language } from './translator';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettingsData>;
  getTranslations: (language: Language) => Promise<TranslationData>;
}
