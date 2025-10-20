import type {
  PaymentStatusData,
  SavedCard,
  SessionData,
  TranslationData
} from './data'
import type { Language } from './translator';

export type PayFields = {
  method: Record<string, unknown>,
  customer: Record<string, unknown>,
  billing?: Record<string, unknown>,
  shipping?: Record<string, unknown>,
};

export type ApiResponse<T> = {
  data: T;
}

export interface Api {
  getSession: (sid: string) => Promise<SessionData>;
  getSavedCards: (sid: string) => Promise<SavedCard[]>;
  getTranslations: (language: Language) => Promise<TranslationData>;
  getPaymentStatus: (sid: string) => Promise<PaymentStatusData>;
  removeSavedCard: (sid: string, cardId: number) => Promise<void>;
  pay: (sid: string, paymentMethodCode: string, fingerprint: string, data: PayFields) => Promise<void>;
  clarify: (sid: string, data: Record<string, unknown>) => Promise<void>;
}
