import React from 'react';
import { Modal, Typography, Row, Col, Switch, Select, Space, Button, Card } from 'antd';
import { 
  SunOutlined, 
  MoonOutlined, 
  GlobalOutlined, 
  ExpandOutlined,
  CompressOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyOutlined,
  EyeOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useAppContext } from '../hooks/useAppContext';

const { Text } = Typography;

interface AccountSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  open,
  onClose
}) => {
  const { 
    language, 
    toggleTheme, 
    changeLanguage, 
    toggleCompactMode,
    isDark,
    isCompact
  } = useAppContext();

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SettingOutlined style={{ marginRight: 8 }} />
          <span>Account Settings</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} icon={<CloseOutlined />}>
          Close
        </Button>
      ]}
      width={700}
      style={{ top: 20 }}
    >
      <div style={{ padding: '10px 0' }}>
        
        {/* Appearance Settings */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SunOutlined style={{ marginRight: 8 }} />
              <span>Appearance Settings</span>
            </div>
          }
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            
            {/* Theme Mode */}
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isDark ? <MoonOutlined style={{ marginRight: 8 }} /> : <SunOutlined style={{ marginRight: 8 }} />}
                  <div>
                    <Text strong>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
                    </Text>
                  </div>
                </div>
              </Col>
              <Col>
                <Switch
                  checked={isDark}
                  onChange={toggleTheme}
                  size={isCompact ? 'small' : 'default'}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                />
              </Col>
            </Row>

            {/* Compact Mode */}
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isCompact ? <CompressOutlined style={{ marginRight: 8 }} /> : <ExpandOutlined style={{ marginRight: 8 }} />}
                  <div>
                    <Text strong>{isCompact ? 'Compact Mode' : 'Comfortable Mode'}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {isCompact ? 'Switch to comfortable spacing' : 'Switch to compact spacing'}
                    </Text>
                  </div>
                </div>
              </Col>
              <Col>
                <Switch
                  checked={isCompact}
                  onChange={toggleCompactMode}
                  size={isCompact ? 'small' : 'default'}
                  checkedChildren="📦"
                  unCheckedChildren="📏"
                />
              </Col>
            </Row>

            {/* Language */}
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <GlobalOutlined style={{ marginRight: 8 }} />
                  <div>
                    <Text strong>Language</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Choose your preferred language
                    </Text>
                  </div>
                </div>
              </Col>
              <Col>
                <Select
                  value={language}
                  onChange={changeLanguage}
                  size={isCompact ? 'small' : 'middle'}
                  style={{ width: 120 }}
                  options={[
                    { 
                      value: 'en', 
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: 8 }}>🇺🇸</span>
                          English
                        </div>
                      )
                    },
                    { 
                      value: 'ar', 
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: 8 }}>🇸🇦</span>
                          العربية
                        </div>
                      )
                    }
                  ]}
                />
              </Col>
            </Row>

          </Space>
        </Card>

        {/* Security Settings */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SafetyOutlined style={{ marginRight: 8 }} />
              <span>Security Settings</span>
            </div>
          }
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Change Password</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Update your account password
                </Text>
              </div>
              <Button size={isCompact ? 'small' : 'middle'}>
                Change
              </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Two-Factor Authentication</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Add an extra layer of security
                </Text>
              </div>
              <Switch size={isCompact ? 'small' : 'default'} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Login History</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  View your recent login activities
                </Text>
              </div>
              <Button size={isCompact ? 'small' : 'middle'}>
                View
              </Button>
            </div>
          </Space>
        </Card>

        {/* Notification Settings */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BellOutlined style={{ marginRight: 8 }} />
              <span>Notification Settings</span>
            </div>
          }
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Email Notifications</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Receive notifications via email
                </Text>
              </div>
              <Switch size={isCompact ? 'small' : 'default'} defaultChecked />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Exam Alerts</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Get notified about exam activities
                </Text>
              </div>
              <Switch size={isCompact ? 'small' : 'default'} defaultChecked />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>System Notifications</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Receive system-wide notifications
                </Text>
              </div>
              <Switch size={isCompact ? 'small' : 'default'} />
            </div>
          </Space>
        </Card>

        {/* Privacy Settings */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EyeOutlined style={{ marginRight: 8 }} />
              <span>Privacy Settings</span>
            </div>
          }
          size="small"
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Profile Visibility</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Control who can see your profile
                </Text>
              </div>
              <Select
                defaultValue="public"
                size={isCompact ? 'small' : 'middle'}
                style={{ width: 120 }}
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'contacts', label: 'Contacts Only' }
                ]}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Data Export</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Download your account data
                </Text>
              </div>
              <Button size={isCompact ? 'small' : 'middle'}>
                Export
              </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Account Deletion</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Permanently delete your account
                </Text>
              </div>
              <Button size={isCompact ? 'small' : 'middle'} danger>
                Delete
              </Button>
            </div>
          </Space>
        </Card>

      </div>
    </Modal>
  );
};

export default AccountSettingsModal; 