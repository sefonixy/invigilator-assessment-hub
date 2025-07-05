import React, { useState } from 'react';
import { Avatar, Dropdown, Button, Switch, Select } from 'antd';
import type { MenuProps } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  DownOutlined,
  SunOutlined,
  MoonOutlined,
  ExpandOutlined,
  CompressOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';
import { useAppContext } from '../hooks/useAppContext';

// Demo profile data - in a real app, this would come from your state management
const defaultProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  role: 'instructor',
  department: 'Computer Science',
  phone: '+1 (555) 123-4567',
  bio: 'Experienced instructor with 5+ years in assessment management and exam supervision.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { 
    themeMode, 
    language, 
    compactMode,
    toggleTheme, 
    changeLanguage, 
    toggleCompactMode,
    isDark,
    isCompact
  } = useAppContext();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const getInitials = () => {
    return `${defaultProfileData.firstName[0]}${defaultProfileData.lastName[0]}`;
  };

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log('Logout clicked');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <span style={{ fontSize: isCompact ? '13px' : '14px' }}>
          {t('profile.viewProfile')}
        </span>
      ),
      onClick: () => setProfileModalOpen(true),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: (
        <span style={{ fontSize: isCompact ? '13px' : '14px' }}>
          {t('profile.settings')}
        </span>
      ),
      onClick: () => setSettingsModalOpen(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'theme',
      icon: isDark ? <SunOutlined /> : <MoonOutlined />,
      label: (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: isCompact ? '13px' : '14px'
        }}>
          <span>{isDark ? t('profile.lightMode') : t('profile.darkMode')}</span>
          <Switch
            size={isCompact ? 'small' : 'default'}
            checked={isDark}
            onChange={(checked) => {
              if ((checked && themeMode === 'light') || (!checked && themeMode === 'dark')) {
                toggleTheme();
              }
            }}
          />
        </div>
      ),
      onClick: () => {},
    },
    {
      key: 'compact',
      icon: isCompact ? <ExpandOutlined /> : <CompressOutlined />,
      label: (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: isCompact ? '13px' : '14px'
        }}>
          <span>{isCompact ? t('profile.comfortableMode') : t('profile.compactMode')}</span>
          <Switch
            size={isCompact ? 'small' : 'default'}
            checked={isCompact}
            onChange={(checked) => {
              if ((checked && compactMode === 'comfortable') || (!checked && compactMode === 'compact')) {
                toggleCompactMode();
              }
            }}
          />
        </div>
      ),
      onClick: () => {},
    },
    {
      key: 'language',
      icon: <GlobalOutlined />,
      label: (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: isCompact ? '13px' : '14px'
        }}>
          <span>{t('profile.language')}</span>
          <Select
            value={language}
            onChange={changeLanguage}
            size={isCompact ? 'small' : 'middle'}
            style={{ width: 70 }}
            options={[
              { value: 'en', label: 'EN' },
              { value: 'ar', label: 'AR' }
            ]}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ),
      onClick: () => {},
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: (
        <span style={{ 
          color: '#ff4d4f',
          fontSize: isCompact ? '13px' : '14px'
        }}>
          {t('profile.logout')}
        </span>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          type="text"
          className="user-profile-button theme-transition"
          style={{
            height: isCompact ? 36 : 40,
            padding: isCompact ? '4px 8px' : '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: isCompact ? 6 : 8,
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: isCompact ? '13px' : '14px'
          }}
        >
          <Avatar
            size={isCompact ? 28 : 32}
            src={defaultProfileData.avatar}
            alt={`${defaultProfileData.firstName} ${defaultProfileData.lastName}`}
            style={{ 
              backgroundColor: '#1890ff',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {getInitials()}
          </Avatar>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            lineHeight: isCompact ? 1.2 : 1.4
          }}>
            <span style={{ 
              fontWeight: 500,
              fontSize: isCompact ? '13px' : '14px'
            }}>
              {defaultProfileData.firstName} {defaultProfileData.lastName}
            </span>
            <span style={{ 
              fontSize: isCompact ? '11px' : '12px',
              opacity: 0.8 
            }}>
              {t(`profile.roles.${defaultProfileData.role}`)}
            </span>
          </div>
          <DownOutlined style={{ 
            fontSize: isCompact ? '10px' : '12px',
            opacity: 0.7 
          }} />
        </Button>
      </Dropdown>

      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profileData={defaultProfileData}
      />
      
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </>
  );
};

export default UserProfile; 