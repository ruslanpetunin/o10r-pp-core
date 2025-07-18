import type { PaymentStatusData, ProjectSettingsData, TranslationData } from './data'
import type { Language } from './translator';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettingsData>;
  getTranslations: (language: Language) => Promise<TranslationData>;
  getPaymentStatus: (token: string) => Promise<PaymentStatusData>;
  pay: (token: string, data: Record<string, unknown>) => Promise<void>;
}
