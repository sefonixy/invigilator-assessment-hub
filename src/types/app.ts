export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'ar';

export interface AppContextType {
  themeMode: ThemeMode;
  language: Language;
  isRTL: boolean;
  toggleTheme: () => void;
  changeLanguage: (lang: Language) => void;
} 