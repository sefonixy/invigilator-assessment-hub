import React from 'react';
import { Modal, Descriptions, Timeline, Tag, Space, Typography, Row, Col, Progress } from 'antd';
import { 
  ClockCircleOutlined, 
  UserOutlined,
  DesktopOutlined,
  GlobalOutlined,
  SafetyOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  WarningOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { ExamineeDetailsModalProps, SessionHealth } from '../../types/examinee';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const ExamineeDetailsModal: React.FC<ExamineeDetailsModalProps> = ({
  visible,
  examinee,
  onClose,
  loading = false
}) => {
  if (!examinee) {
    return null;
  }

  // Session health color mapping
  const getHealthColor = (health: SessionHealth): string => {
    switch (health) {
      case 'Excellent': return '#52c41a';
      case 'Good': return '#1890ff'; 
      case 'Fair': return '#faad14';
      case 'Poor': return '#ff7a45';
      case 'Critical': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  // Session health percentage
  const getHealthPercentage = (health: SessionHealth): number => {
    switch (health) {
      case 'Excellent': return 95;
      case 'Good': return 80;
      case 'Fair': return 60;
      case 'Poor': return 40;
      case 'Critical': return 20;
      default: return 0;
    }
  };

  // Get timeline item icon based on log type
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'login': return <LoginOutlined style={{ color: '#52c41a' }} />;
      case 'logout': return <LogoutOutlined style={{ color: '#ff4d4f' }} />;
      case 'start': return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
      case 'submit': return <FileTextOutlined style={{ color: '#722ed1' }} />;
      case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'error': return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default: return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
    }
  };

  // Calculate progress percentage
  const progressPercentage = examinee.totalQuestions > 0 
    ? Math.round((examinee.questionsSynced / examinee.totalQuestions) * 100)
    : 0;

  return (
    <Modal
      title={
        <Space>
          <UserOutlined />
          <span>Examinee Details - {examinee.fullName}</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      loading={loading}
      style={{ top: 20 }}
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Basic Information */}
        <Descriptions 
          title="Student Information" 
          bordered 
          size="small"
          column={2}
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Username" span={1}>
            <Text strong>{examinee.username}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Full Name" span={1}>
            <Text strong>{examinee.fullName}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Area" span={1}>
            {examinee.areaName}
          </Descriptions.Item>
          <Descriptions.Item label="Group" span={1}>
            {examinee.groupName}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={1}>
            <Tag 
              color={examinee.status === 'Present' ? 'green' : 
                     examinee.status === 'Absent' ? 'red' : 'orange'}
            >
              {examinee.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="IP Address" span={1}>
            <Space>
              <GlobalOutlined />
              {examinee.ipAddress}
            </Space>
          </Descriptions.Item>
        </Descriptions>

        {/* Exam Progress */}
        <Title level={5} style={{ marginBottom: 16 }}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          Exam Progress
        </Title>
        
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 6 }}>
              <Text strong>Questions Completed</Text>
              <div style={{ marginTop: 8 }}>
                <Progress 
                  percent={progressPercentage}
                  format={() => `${examinee.questionsSynced}/${examinee.totalQuestions}`}
                  strokeColor={progressPercentage === 100 ? '#52c41a' : '#1890ff'}
                />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 6 }}>
              <Text strong>Time Elapsed</Text>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 500 }}>
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                {examinee.timeElapsed}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Remaining: {examinee.remainingTime} minutes
              </Text>
            </div>
          </Col>
        </Row>

        {/* Technical Information */}
        <Descriptions 
          title="Technical Information" 
          bordered 
          size="small"
          column={2}
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Platform" span={1}>
            <Space>
              <DesktopOutlined />
              {examinee.platform}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Browser" span={1}>
            {examinee.browserInfo}
          </Descriptions.Item>
          <Descriptions.Item label="Session Health" span={2}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <SafetyOutlined style={{ color: getHealthColor(examinee.sessionHealth) }} />
                <Text strong style={{ color: getHealthColor(examinee.sessionHealth) }}>
                  {examinee.sessionHealth}
                </Text>
              </Space>
              <Progress 
                percent={getHealthPercentage(examinee.sessionHealth)}
                strokeColor={getHealthColor(examinee.sessionHealth)}
                size="small"
                showInfo={false}
              />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Last Activity" span={2}>
            {dayjs(examinee.lastActivity).format('YYYY-MM-DD HH:mm:ss')} 
            <Text type="secondary" style={{ marginLeft: 8 }}>
              ({dayjs(examinee.lastActivity).fromNow()})
            </Text>
          </Descriptions.Item>
        </Descriptions>

        {/* Activity Timeline */}
        <Title level={5} style={{ marginBottom: 16 }}>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Login-Logout Activity Timeline
        </Title>
        
        <div style={{ 
          backgroundColor: '#fafafa', 
          padding: 16, 
          borderRadius: 6,
          maxHeight: 300,
          overflowY: 'auto'
        }}>
          <Timeline
            items={examinee.logs.map((log) => ({
              dot: getTimelineIcon(log.type),
              children: (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>{log.activity}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {dayjs(log.timestamp).format('HH:mm:ss')}
                    </Text>
                  </div>
                  {log.details && (
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                      {log.details}
                    </Text>
                  )}
                </div>
              )
            }))}
          />
          
          {examinee.logs.length === 0 && (
            <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
              <ExclamationCircleOutlined style={{ fontSize: 24, marginBottom: 8 }} />
              <div>No activity logs available</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExamineeDetailsModal; 