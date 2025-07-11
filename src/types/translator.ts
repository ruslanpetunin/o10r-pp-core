import type { EventManager } from './event';

export enum Language {
  RU = 'ru',
  EN = 'en'
}

export interface Translator extends Omit<EventManager<TranslationEventMap>, 'emit'> {
  translate: (key: string, data?: Record<string, unknown>) => string;
  setLanguage: (lang: Language) => Promise<void>;
}

export type TranslationEventMap = {
  languageChanged: (language: Language) => void;
};
