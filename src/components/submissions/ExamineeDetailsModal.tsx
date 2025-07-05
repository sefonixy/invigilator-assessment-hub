import React from 'react';
import { Modal, Row, Col, Progress, Tag, Typography, Timeline } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, PlayCircleOutlined, EditOutlined } from '@ant-design/icons';
import type { Examinee, Assessment } from '../../types/data';

const { Title, Text } = Typography;

interface ExamineeDetailsModalProps {
  visible: boolean;
  examinee: Examinee | null;
  onClose: () => void;
  assessment: Assessment;
}

const ExamineeDetailsModal: React.FC<ExamineeDetailsModalProps> = ({
  visible,
  examinee,
  onClose,
  assessment
}) => {
  if (!examinee) return null;

  const progressPercentage = (examinee.questionsSynced / 20) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Student Submission':
        return 'success';
      case 'Pending':
        return 'processing';
      case 'Absent':
        return 'error';
      case 'Not Started':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: 8 }} />
          <span>Examinee Details - {examinee.fullName}</span>
        </div>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <div style={{ padding: '20px 0' }}>
        {/* Student Information */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>Student Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Username</Text>
                <div style={{ fontWeight: 500 }}>{examinee.username}</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Area</Text>
                <div style={{ fontWeight: 500 }}>{assessment.areaName}</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Status</Text>
                <div>
                  <Tag color={getStatusColor(examinee.status)}>{examinee.status}</Tag>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Full Name</Text>
                <div style={{ fontWeight: 500 }}>{examinee.fullName}</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Group</Text>
                <div style={{ fontWeight: 500 }}>{examinee.groupName}</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">IP Address</Text>
                <div style={{ fontWeight: 500 }}>{examinee.ipAddress}</div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Exam Progress */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>
            <EditOutlined style={{ marginRight: 8 }} />
            Exam Progress
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">Questions Completed</Text>
                <div style={{ marginTop: '8px' }}>
                  <Progress
                    percent={progressPercentage}
                    format={() => `${examinee.questionsSynced}/20`}
                    strokeColor="#52c41a"
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">Time Elapsed</Text>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginTop: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  {examinee.timeElapsed}
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Remaining: 65 minutes
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Technical Information */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>Technical Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Platform</Text>
                <div style={{ fontWeight: 500 }}>{examinee.platform}</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Session Health</Text>
                <div>
                  <Progress
                    percent={100}
                    showInfo={false}
                    strokeColor="#52c41a"
                    size="small"
                  />
                  <Text style={{ color: '#52c41a', fontSize: '12px' }}>
                    {examinee.sessionHealth}
                  </Text>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Browser</Text>
                <div style={{ fontWeight: 500 }}>Chrome 120.0.6099.129</div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text type="secondary">Last Activity</Text>
                <div style={{ color: '#52c41a', fontSize: '12px' }}>
                  2025-07-05 09:53:13 (a few seconds ago)
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Login-Logout Activity Timeline */}
        <div>
          <Title level={5}>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            Login-Logout Activity Timeline
          </Title>
          <Timeline>
            {examinee.activityTimeline.map((entry, index) => (
              <Timeline.Item
                key={index}
                dot={
                  entry.activity.includes('logged in') ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                  entry.activity.includes('started') ? <PlayCircleOutlined style={{ color: '#1890ff' }} /> :
                  <EditOutlined style={{ color: '#722ed1' }} />
                }
              >
                <div style={{ marginBottom: '4px' }}>
                  <Text strong>{entry.activity}</Text>
                  <Text type="secondary" style={{ float: 'right' }}>
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {entry.details}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </Modal>
  );
};

export default ExamineeDetailsModal; 