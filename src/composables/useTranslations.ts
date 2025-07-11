import useEventManager from './useEventManager';
import type { Api } from '../types/api';
import { Language } from '../types/translation';
import type { TranslationEventMap, Translations } from '../types/translation';

export default function(api: Api, initialLanguage: Language = Language.EN) {
  const eventManager = useEventManager<TranslationEventMap>();

  const cache: Record<Language, Translations> = {} as Record<Language, Translations>;
  let currentLanguage = initialLanguage;

  async function load(lang: Language): Promise<void> {
    if (!cache[lang]) {
      cache[lang] = await api.getTranslations(lang);
    }
  }

  async function setLanguage(lang: Language): Promise<void> {
    await load(lang);
    currentLanguage = lang;
    eventManager.emit('languageChanged', lang);
  }

  function getNested(data: Record<string, unknown>, path: string[]): unknown {
    return path.reduce<unknown>((acc, key) => {
      if (typeof acc === 'object' && acc !== null && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, data);
  }

  function applyTemplate(template: string, data?: Record<string, unknown>): string {
    if (!data) return template;
    return template.replace(/{{\s*([\w.]+)\s*}}/g, (match, path) => {
      const value = getNested(data, path.split('.'));
      return value === undefined ? match : String(value);
    });
  }

  function translate(key: string, data?: Record<string, unknown>): string {
    const translations = cache[currentLanguage];
    const template = translations?.[key] ?? key;
    return applyTemplate(template, data);
  }

  return {
    translate,
    setLanguage,
    onLanguageChange: (handler: (language: Language) => void) => eventManager.on('languageChanged', handler),
    offLanguageChange: (handler: (language: Language) => void) => eventManager.off('languageChanged', handler),
  };
}
