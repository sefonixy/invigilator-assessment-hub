import React from 'react';
import {
  Modal,
  Select,
  Switch,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  Form
} from 'antd';
import { 
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
  CompressOutlined,
  ExpandOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import type { Language } from '../types/app';

const { Text, Title } = Typography;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose
}) => {
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

  const handleThemeChange = (checked: boolean) => {
    if ((checked && themeMode === 'light') || (!checked && themeMode === 'dark')) {
      toggleTheme();
    }
  };

  const handleLanguageChange = (value: Language) => {
    changeLanguage(value);
  };

  const handleCompactModeChange = (checked: boolean) => {
    if ((checked && compactMode === 'comfortable') || (!checked && compactMode === 'compact')) {
      toggleCompactMode();
    }
  };

  return (
    <Modal
      title={
        <Space>
          <GlobalOutlined />
          {t('settings.title')}
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      style={{ top: 20 }}
    >
      <div style={{ padding: '16px 0' }}>
        <Form layout="vertical" size={isCompact ? 'small' : 'middle'}>
          
          {/* Appearance Section */}
          <Title level={5} style={{ marginBottom: 16 }}>
            {t('settings.appearance.title')}
          </Title>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={
                  <Space>
                    {isDark ? <MoonOutlined /> : <SunOutlined />}
                    {t('settings.appearance.theme')}
                  </Space>
                }
                style={{ marginBottom: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{isDark ? t('settings.appearance.darkMode') : t('settings.appearance.lightMode')}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {t('settings.appearance.themeDescription')}
                    </Text>
                  </div>
                  <Switch
                    checked={isDark}
                    onChange={handleThemeChange}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={
                  <Space>
                    {isCompact ? <CompressOutlined /> : <ExpandOutlined />}
                    {t('settings.appearance.density')}
                  </Space>
                }
                style={{ marginBottom: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>
                      {isCompact ? t('settings.appearance.compactMode') : t('settings.appearance.comfortableMode')}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {t('settings.appearance.densityDescription')}
                    </Text>
                  </div>
                  <Switch
                    checked={isCompact}
                    onChange={handleCompactModeChange}
                    checkedChildren={<CompressOutlined />}
                    unCheckedChildren={<ExpandOutlined />}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Language Section */}
          <Title level={5} style={{ marginBottom: 16 }}>
            {t('settings.language.title')}
          </Title>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={
                  <Space>
                    <GlobalOutlined />
                    {t('settings.language.interface')}
                  </Space>
                }
              >
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  style={{ width: '100%' }}
                  options={[
                    {
                      value: 'en',
                      label: (
                        <Space>
                          <span>🇺🇸</span>
                          <span>English</span>
                        </Space>
                      )
                    },
                    {
                      value: 'ar',
                      label: (
                        <Space>
                          <span>🇸🇦</span>
                          <span>العربية</span>
                        </Space>
                      )
                    }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Performance Section */}
          <Title level={5} style={{ marginBottom: 16 }}>
            {t('settings.performance.title')}
          </Title>
          
          <Text type="secondary" style={{ fontSize: 13 }}>
            {t('settings.performance.description')}
          </Text>
          
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: 6,
            fontSize: 12
          }}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Theme:</Text>
                <Text type="secondary">{themeMode}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Language:</Text>
                <Text type="secondary">{language.toUpperCase()}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Density:</Text>
                <Text type="secondary">{compactMode}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">RTL:</Text>
                <Text type="secondary">{language === 'ar' ? 'enabled' : 'disabled'}</Text>
              </div>
            </Space>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SettingsModal; 