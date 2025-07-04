import React from 'react';
import {
  Modal,
  Select,
  Switch,
  Typography,
  Row,
  Col,
  Divider,
  notification
} from 'antd';
import { 
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import type { Language } from '../types/app';

const { Text } = Typography;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose
}) => {
  const { t } = useTranslation();
  const { themeMode, language, changeLanguage, toggleTheme } = useAppContext();

  // Language options
  const languageOptions = [
    {
      label: t('languages.english'),
      value: 'en' as Language,
    },
    {
      label: t('languages.arabic'),
      value: 'ar' as Language,
    },
  ];

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    notification.info({
      message: t('notifications.languageChanged'),
      description: t('notifications.languageChangedDescription', { 
        language: t(`languages.${newLanguage === 'en' ? 'english' : 'arabic'}`) 
      }),
      placement: 'topRight',
    });
  };

  const handleThemeToggle = () => {
    toggleTheme();
    notification.success({
      message: `${t('settings.theme')} ${t('notifications.success')}`,
      description: `${t('settings.theme')} changed to ${themeMode === 'light' ? t('settings.dark') : t('settings.light')}`,
      placement: 'topRight',
    });
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SettingOutlined />
          <span>Settings</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      destroyOnClose
    >
      <div style={{ padding: '16px 0' }}>
        {/* Interface Preferences */}
        <Divider orientation="left">
          <Text strong style={{ fontSize: 16 }}>Interface Preferences</Text>
        </Divider>

        <div style={{ marginBottom: 32 }}>
          <Row gutter={[16, 24]}>
            {/* Language Setting */}
            <Col span={24}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 16 }}>
                  <GlobalOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  {t('settings.language')}
                </Text>
                <Text style={{ display: 'block', marginBottom: 12, opacity: 0.8 }}>
                  Select your preferred interface language. This will change the language across the entire application.
                </Text>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  options={languageOptions}
                  style={{ width: '100%' }}
                  size="large"
                />
              </div>
            </Col>

            {/* Theme Setting */}
            <Col span={24}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 16 }}>
                  <SunOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  {t('settings.theme')}
                </Text>
                <Text style={{ display: 'block', marginBottom: 12, opacity: 0.8 }}>
                  Choose between light and dark theme for better viewing experience.
                </Text>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  padding: '12px 16px',
                  backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#fafafa',
                  borderRadius: 8,
                  border: themeMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #d9d9d9'
                }}>
                  <SunOutlined style={{ color: themeMode === 'light' ? '#1890ff' : 'rgba(255, 255, 255, 0.45)' }} />
                  <Text style={{ 
                    color: themeMode === 'light' ? '#1890ff' : 'rgba(255, 255, 255, 0.45)',
                    fontWeight: themeMode === 'light' ? 600 : 400
                  }}>
                    {t('settings.light')}
                  </Text>
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={handleThemeToggle}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    size="default"
                  />
                  <Text style={{ 
                    color: themeMode === 'dark' ? '#1890ff' : 'rgba(0, 0, 0, 0.45)',
                    fontWeight: themeMode === 'dark' ? 600 : 400
                  }}>
                    {t('settings.dark')}
                  </Text>
                  <MoonOutlined style={{ color: themeMode === 'dark' ? '#1890ff' : 'rgba(0, 0, 0, 0.45)' }} />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Additional Settings Section (Placeholder) */}
        <Divider orientation="left">
          <Text strong style={{ fontSize: 16 }}>Application Settings</Text>
        </Divider>

        <div style={{ 
          padding: '16px',
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f5f5f5',
          borderRadius: 6,
          textAlign: 'center',
          border: themeMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}>
          <Text style={{ opacity: 0.7 }}>
            Additional application settings will be available here in future updates.
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal; 