import { defineStore } from 'pinia';

export type Language = 'ru' | 'en' | 'fr';

interface LanguageState {
  currentLanguage: Language;
}

export const useLanguageStore = defineStore('language', {
  state: (): LanguageState => ({
    currentLanguage: 'ru'
  }),
  getters: {
    getLocalizedContent: (state) => (locale: Record<Language, any>) => {
      if (locale[state.currentLanguage] && Object.keys(locale[state.currentLanguage]).length > 0) {
        return locale[state.currentLanguage];
      }
      
      // Fallback logic
      for (const lang of ['ru', 'en', 'fr'] as Language[]) {
        if (locale[lang] && Object.keys(locale[lang]).length > 0) {
          return locale[lang];
        }
      }
      
      return null;
    }
  }
});