import type { ProjectSettingsData } from './data';
import type { Language, Translations } from './translation';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettingsData>;
  getTranslations: (language: Language) => Promise<Translations>;
}
