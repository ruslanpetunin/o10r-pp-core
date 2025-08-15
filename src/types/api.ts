import type {
  InitData,
  PaymentStatusData,
  ProjectSettingsData,
  SavedCard,
  TranslationData
} from './data'
import type { Language } from './translator';

export interface Api {
  getInitData: (sid: string) => Promise<InitData>;
  getSavedCards: (sid: string) => Promise<SavedCard[]>;
  getTranslations: (language: Language) => Promise<TranslationData>;
  getPaymentStatus: (sid: string) => Promise<PaymentStatusData>;
  removeSavedCard: (sid: string, cardId: number) => Promise<void>;
  pay: (sid: string, data: Record<string, unknown>) => Promise<void>;
  clarify: (sid: string, data: Record<string, unknown>) => Promise<void>;
}
