export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'ar';
export type CompactMode = 'comfortable' | 'compact';

export interface AppContextType {
  // Theme settings
  themeMode: ThemeMode;
  language: Language;
  compactMode: CompactMode;
  isRTL: boolean;
  
  // Theme methods
  toggleTheme: () => void;
  changeLanguage: (lang: Language) => void;
  toggleCompactMode: () => void;
  
  // Theme utilities
  isDark: boolean;
  isCompact: boolean;
} 