import React, { useState } from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  EditOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';

// Demo profile data - in a real app, this would come from your state management
const defaultProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@invigilator.com',
  phone: '+1 (555) 123-4567',
  role: 'invigilator',
  department: 'Assessment Department',
  bio: 'Experienced invigilator with 5+ years in assessment management and exam supervision.'
};

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const getInitials = () => {
    const first = defaultProfileData.firstName?.[0] || '';
    const last = defaultProfileData.lastName?.[0] || '';
    return (first + last).toUpperCase();
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <EditOutlined />,
      label: t('profile.buttons.edit'),
      onClick: () => setProfileModalOpen(true),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => setSettingsModalOpen(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('profile.buttons.logout'),
      danger: true,
      onClick: () => {
        // Placeholder for logout
        console.log('Logout clicked');
      },
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        trigger={['click']}
        arrow={{ pointAtCenter: true }}
      >
        <div 
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 8px',
            borderRadius: 6,
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Space align="center" size={8}>
            <div style={{ textAlign: 'right', color: 'white' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.2 }}>
                {defaultProfileData.firstName} {defaultProfileData.lastName}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8, lineHeight: 1.2 }}>
                {t(`profile.roles.${defaultProfileData.role}`)}
              </div>
            </div>
            <Avatar 
              size={40}
              icon={<UserOutlined />}
              style={{ 
                backgroundColor: '#1890ff',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              {getInitials()}
            </Avatar>
          </Space>
        </div>
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