import type { PaymentStatusData, ProjectSettingsData, SavedCard, TranslationData } from './data';
import type { Language } from './translator';

export interface Api {
  getProjectSettings: (projectHash: string) => Promise<ProjectSettingsData>;
  getSavedCards: (token: string) => Promise<SavedCard[]>;
  getTranslations: (language: Language) => Promise<TranslationData>;
  getPaymentStatus: (token: string) => Promise<PaymentStatusData>;
  removeSavedCard: (token: string, cardId: number) => Promise<void>;
  pay: (token: string, data: Record<string, unknown>) => Promise<void>;
  clarify: (token: string, data: Record<string, unknown>) => Promise<void>;
}
