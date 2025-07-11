import useEventManager from './useEventManager';
import type { Api } from '../types/api';
import { Language } from '../types/translator';
import type { TranslationEventMap, Translator } from '../types/translator';
import type { TranslationData } from '../types/data';

export default function(api: Api): Translator {
  const { on, off, emit} = useEventManager<TranslationEventMap>();
  const cache: Partial<Record<Language, TranslationData>> = {};

  let currentLanguage: Language | undefined = undefined;

  async function load(lang: Language): Promise<void> {
    if (!cache[lang]) {
      cache[lang] = await api.getTranslations(lang);
    }
  }

  async function setLanguage(lang: Language): Promise<void> {
    await load(lang);

    currentLanguage = lang;

    emit('languageChanged', lang);
  }

  function getNested(data: Record<string, unknown>, path: string[]): unknown {
    return path.reduce<unknown>(
      (acc, key) => {
        if (typeof acc === 'object' && acc !== null && key in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[key];
        }
        return undefined;
      },
      data
    );
  }

  function replaceTemplateVariables(translation: string, data: Record<string, unknown>): string {
    return translation.replace(
      /{{\s*([\w.]+)\s*}}/g,
      (match, path) => {
        const value = getNested(data, path.split('.'));

        return value === undefined ? match : String(value);
      }
    );
  }

  function translate(key: string, data?: Record<string, unknown>): string {
    if (currentLanguage) {
      const translations = cache[currentLanguage];
      const translation = translations?.[key] ?? key;

      return data ? replaceTemplateVariables(translation, data) : translation;
    }

    throw new Error('Language not set. Please call setLanguage before translating.');
  }

  return {
    translate,
    setLanguage,
    on,
    off
  };
}
