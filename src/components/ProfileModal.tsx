import React from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Divider,
  Typography,
  Avatar,
  Row,
  Col
} from 'antd';
import { 
  UserOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileData: ProfileData;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  profileData
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Role options
  const roleOptions = [
    { label: t('profile.roles.admin'), value: 'admin' },
    { label: t('profile.roles.invigilator'), value: 'invigilator' },
    { label: t('profile.roles.supervisor'), value: 'supervisor' },
    { label: t('profile.roles.coordinator'), value: 'coordinator' }
  ];

  const getInitials = () => {
    const first = profileData.firstName?.[0] || '';
    const last = profileData.lastName?.[0] || '';
    return (first + last).toUpperCase();
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <div style={{ padding: '24px 0' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {getInitials()}
          </Avatar>
          <Title level={3} style={{ margin: '16px 0 8px 0' }}>
            {t('profile.title')}
          </Title>
          <Text type="secondary">
            {profileData.firstName} {profileData.lastName}
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={profileData}
          disabled={true}
        >
          {/* Personal Information Section */}
          <Divider orientation="left">
            <Text strong>{t('profile.personalInfo')}</Text>
          </Divider>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.firstName')}
                name="firstName"
              >
                <Input 
                  placeholder={t('profile.placeholders.firstName')}
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.lastName')}
                name="lastName"
              >
                <Input 
                  placeholder={t('profile.placeholders.lastName')}
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.email')}
                name="email"
              >
                <Input 
                  placeholder={t('profile.placeholders.email')}
                  type="email"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.phone')}
                name="phone"
              >
                <Input 
                  placeholder={t('profile.placeholders.phone')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.role')}
                name="role"
              >
                <Select 
                  options={roleOptions}
                  placeholder="Select a role"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t('profile.department')}
                name="department"
              >
                <Input placeholder="Enter department" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t('profile.bio')}
            name="bio"
          >
            <TextArea 
              rows={3}
              placeholder={t('profile.placeholders.bio')}
            />
          </Form.Item>


        </Form>
      </div>
    </Modal>
  );
};

export default ProfileModal; 