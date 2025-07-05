// Central theme configuration file
export const THEME_CONSTANTS = {
  // Color Palette
  colors: {
    primary: '#1890ff',
    primaryHover: '#40a9ff',
    primaryActive: '#096dd9',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    
    // Neutral colors
    white: '#ffffff',
    black: '#000000',
    
    // Light theme colors
    light: {
      background: '#f0f2f5',
      backgroundElevated: '#ffffff',
      backgroundContent: '#fafafa',
      text: '#000000d9',
      textSecondary: '#00000073',
      textDisabled: '#00000040',
      border: '#d9d9d9',
      borderLight: '#f0f0f0',
      shadow: 'rgba(0, 0, 0, 0.1)',
      header: '#1890ff',
      sider: '#ffffff'
    },
    
    // Dark theme colors
    dark: {
      background: '#141414',
      backgroundElevated: '#1f1f1f',
      backgroundContent: '#262626',
      text: '#ffffffd9',
      textSecondary: '#ffffff73',
      textDisabled: '#ffffff40',
      border: '#434343',
      borderLight: '#303030',
      shadow: 'rgba(0, 0, 0, 0.3)',
      header: '#001529',
      sider: '#001529'
    }
  },
  
  // Typography
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    code: '"Fira Code", "SF Mono", Monaco, Menlo, "Ubuntu Mono", monospace',
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    sizes: {
      xs: '11px',
      sm: '12px',
      base: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    }
  },
  
  // Spacing & Layout
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64
  },
  
  // Border Radius
  borderRadius: {
    sm: 4,
    base: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  },
  
  // Compact mode adjustments
  compact: {
    padding: {
      xs: 2,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16
    },
    fontSize: {
      reduction: 0.875 // 87.5% of normal size
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6
    }
  },
  
  // Component specific sizes
  components: {
    header: {
      height: 64,
      heightCompact: 48
    },
    sidebar: {
      width: 256,
      widthCollapsed: 80
    },
    table: {
      rowHeight: 54,
      rowHeightCompact: 40
    },
    card: {
      padding: 24,
      paddingCompact: 16
    }
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  }
};

// Helper functions for theme values
export const getThemeColors = (isDark: boolean) => 
  isDark ? THEME_CONSTANTS.colors.dark : THEME_CONSTANTS.colors.light;

export const getFontSize = (size: keyof typeof THEME_CONSTANTS.fonts.sizes, isCompact = false) => {
  const baseSize = THEME_CONSTANTS.fonts.sizes[size];
  if (!isCompact) return baseSize;
  
  const numericSize = parseInt(baseSize);
  return `${Math.round(numericSize * THEME_CONSTANTS.compact.fontSize.reduction)}px`;
};

export const getSpacing = (size: keyof typeof THEME_CONSTANTS.spacing, isCompact = false) => {
  const baseSpacing = THEME_CONSTANTS.spacing[size];
  if (!isCompact) return baseSpacing;
  
  return Math.round(baseSpacing * 0.75); // 75% of normal spacing in compact mode
};

export const getComponentHeight = (component: string, isCompact = false) => {
  switch (component) {
    case 'header':
      return isCompact ? THEME_CONSTANTS.components.header.heightCompact : THEME_CONSTANTS.components.header.height;
    case 'tableRow':
      return isCompact ? THEME_CONSTANTS.components.table.rowHeightCompact : THEME_CONSTANTS.components.table.rowHeight;
    default:
      return 'auto';
  }
}; 