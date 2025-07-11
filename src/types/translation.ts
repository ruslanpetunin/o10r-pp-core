export enum Language {
  RU = 'ru',
  EN = 'en'
}

export interface Translations {
  [key: string]: string;
}

export interface TranslationEventMap {
  languageChanged: (language: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => void;
}
