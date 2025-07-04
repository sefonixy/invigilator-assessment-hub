import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import type { AppContextType, ThemeMode, Language } from '../types/app';
import { AppContext } from './context';

interface AppProviderProps {
  children: ReactNode;
}

// Provider Component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // State
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'light';
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'ar';

  // Theme configuration
  const themeConfig = {
    algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      // RTL-specific adjustments
      ...(isRTL && {
        fontFamily: '"Segoe UI", Tahoma, Arial, sans-serif'
      })
    }
  };

  // Locale configuration
  const locale = language === 'ar' ? arEG : enUS;

  // Effects
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
    
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL, i18n]);

  // Methods
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const contextValue: AppContextType = {
    themeMode,
    language,
    isRTL,
    toggleTheme,
    changeLanguage
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ConfigProvider
        theme={themeConfig}
        locale={locale}
        direction={isRTL ? 'rtl' : 'ltr'}
      >
        {children}
      </ConfigProvider>
    </AppContext.Provider>
  );
}; 