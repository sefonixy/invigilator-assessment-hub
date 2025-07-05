import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import type { AppContextType, ThemeMode, Language, CompactMode } from '../types/app';
import { AppContext } from './context';
import { THEME_CONSTANTS, getThemeColors } from '../constants/theme';

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

  const [compactMode, setCompactMode] = useState<CompactMode>(() => {
    const saved = localStorage.getItem('compactMode');
    return (saved as CompactMode) || 'comfortable';
  });

  const isRTL = language === 'ar';
  const isDark = themeMode === 'dark';
  const isCompact = compactMode === 'compact';
  const themeColors = getThemeColors(isDark);

  // Enhanced theme configuration
  const themeConfig = {
    algorithm: [
      isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      ...(isCompact ? [antdTheme.compactAlgorithm] : [])
    ],
    token: {
      // Color tokens
      colorPrimary: THEME_CONSTANTS.colors.primary,
      colorSuccess: THEME_CONSTANTS.colors.success,
      colorWarning: THEME_CONSTANTS.colors.warning,
      colorError: THEME_CONSTANTS.colors.error,
      colorInfo: THEME_CONSTANTS.colors.info,
      
      // Typography tokens
      fontFamily: THEME_CONSTANTS.fonts.primary,
      fontSize: isCompact ? 13 : 14,
      fontSizeHeading1: isCompact ? 28 : 32,
      fontSizeHeading2: isCompact ? 22 : 24,
      fontSizeHeading3: isCompact ? 18 : 20,
      fontSizeHeading4: isCompact ? 16 : 18,
      fontSizeHeading5: isCompact ? 14 : 16,
      
      // Layout tokens
      borderRadius: THEME_CONSTANTS.borderRadius.base,
      borderRadiusLG: THEME_CONSTANTS.borderRadius.md,
      borderRadiusSM: THEME_CONSTANTS.borderRadius.sm,
      
      // Spacing tokens
      padding: isCompact ? THEME_CONSTANTS.compact.padding.md : THEME_CONSTANTS.spacing.md,
      paddingLG: isCompact ? THEME_CONSTANTS.compact.padding.lg : THEME_CONSTANTS.spacing.lg,
      paddingSM: isCompact ? THEME_CONSTANTS.compact.padding.sm : THEME_CONSTANTS.spacing.sm,
      paddingXS: isCompact ? THEME_CONSTANTS.compact.padding.xs : THEME_CONSTANTS.spacing.xs,
      
      // Component specific tokens
      controlHeight: isCompact ? 28 : 32,
      controlHeightLG: isCompact ? 36 : 40,
      controlHeightSM: isCompact ? 22 : 24,
      
      // Line height
      lineHeight: isCompact ? THEME_CONSTANTS.compact.lineHeight.tight : THEME_CONSTANTS.compact.lineHeight.normal,
      lineHeightHeading: isCompact ? THEME_CONSTANTS.compact.lineHeight.normal : THEME_CONSTANTS.compact.lineHeight.relaxed,
      
      // Background colors
      colorBgContainer: themeColors.backgroundElevated,
      colorBgElevated: themeColors.backgroundElevated,
      colorBgLayout: themeColors.background,
      
      // Text colors
      colorText: themeColors.text,
      colorTextSecondary: themeColors.textSecondary,
      colorTextDisabled: themeColors.textDisabled,
      
      // Border colors
      colorBorder: themeColors.border,
      colorBorderSecondary: themeColors.borderLight,
      
      // Shadow
      boxShadow: `0 2px 8px ${themeColors.shadow}`,
      boxShadowSecondary: `0 1px 4px ${themeColors.shadow}`,
      
      // RTL-specific adjustments
      ...(isRTL && {
        fontFamily: '"Segoe UI", Tahoma, Arial, sans-serif'
      })
    },
    components: {
      Layout: {
        headerBg: themeColors.header,
        headerColor: THEME_CONSTANTS.colors.white,
        headerHeight: isCompact ? THEME_CONSTANTS.components.header.heightCompact : THEME_CONSTANTS.components.header.height,
        footerBg: isDark ? THEME_CONSTANTS.colors.dark.backgroundElevated : THEME_CONSTANTS.colors.light.background,
        bodyBg: themeColors.background,
        siderBg: themeColors.sider
      },
      Menu: {
        itemBg: 'transparent',
        itemColor: isDark ? THEME_CONSTANTS.colors.white : themeColors.text,
        itemHoverBg: 'rgba(255, 255, 255, 0.1)',
        itemSelectedBg: 'rgba(255, 255, 255, 0.15)',
        itemHeight: isCompact ? 32 : 40
      },
      Table: {
        headerBg: themeColors.backgroundContent,
        rowHoverBg: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
        cellPaddingBlock: isCompact ? 8 : 12,
        cellPaddingInline: isCompact ? 12 : 16
      },
      Card: {
        paddingLG: isCompact ? THEME_CONSTANTS.components.card.paddingCompact : THEME_CONSTANTS.components.card.padding,
        headerBg: 'transparent'
      },
      Button: {
        paddingInline: isCompact ? 12 : 16,
        controlHeight: isCompact ? 28 : 32,
        controlHeightLG: isCompact ? 36 : 40,
        controlHeightSM: isCompact ? 22 : 24
      },
      Input: {
        paddingInline: isCompact ? 8 : 12,
        controlHeight: isCompact ? 28 : 32,
        controlHeightLG: isCompact ? 36 : 40,
        controlHeightSM: isCompact ? 22 : 24
      },
      Select: {
        controlHeight: isCompact ? 28 : 32,
        controlHeightLG: isCompact ? 36 : 40,
        controlHeightSM: isCompact ? 22 : 24
      },
      Modal: {
        contentBg: themeColors.backgroundElevated,
        headerBg: themeColors.backgroundElevated,
        titleColor: themeColors.text
      },
      Dropdown: {
        controlItemBgHover: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
      }
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

  useEffect(() => {
    localStorage.setItem('compactMode', compactMode);
    
    // Add CSS custom properties for theme colors
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Add theme mode class
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${themeMode}`);
    
    // Add compact mode class
    root.className = root.className.replace(/compact-\w+/g, '');
    root.classList.add(`compact-${compactMode}`);
    
  }, [compactMode, themeColors, themeMode]);

  // Methods
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => prev === 'comfortable' ? 'compact' : 'comfortable');
  };

  const contextValue: AppContextType = {
    themeMode,
    language,
    compactMode,
    isRTL,
    isDark,
    isCompact,
    toggleTheme,
    changeLanguage,
    toggleCompactMode
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