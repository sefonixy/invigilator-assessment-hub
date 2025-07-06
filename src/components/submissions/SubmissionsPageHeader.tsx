import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import type { Assessment } from '../../types/data';

const { Title, Text } = Typography;

interface SubmissionsPageHeaderProps {
  assessment: Assessment | null;
  loading: boolean;
}

const SubmissionsPageHeader: React.FC<SubmissionsPageHeaderProps> = ({
  assessment,
  loading
}) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/assessments">
          Assessments
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FileTextOutlined />
          <span>Track Submissions</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Page Title and Assessment Info */}
      {loading ? (
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Loading Assessment...
          </Title>
        </div>
      ) : assessment ? (
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '16px',
          border: '1px solid #d9d9d9'
        }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            Track Submissions
          </Title>
          
          <div style={{ 
            marginTop: '12px',
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: '16px',
            alignItems: window.innerWidth < 768 ? 'flex-start' : 'center'
          }}>
            <div>
              <Text strong style={{ fontSize: '16px' }}>
                {assessment.assessmentName}
              </Text>
              <br />
              <Text type="secondary">
                {assessment.areaName} • {assessment.course} • {assessment.program}
              </Text>
            </div>
            
            <div style={{ 
              marginLeft: window.innerWidth < 768 ? '0' : 'auto',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                  Start Date
                </Text>
                <Text strong>
                  {new Date(assessment.assessmentStartDate).toLocaleDateString()}
                </Text>
                <Text type="secondary" style={{ marginLeft: '8px' }}>
                  {new Date(assessment.assessmentStartDate).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </div>
              
              <div>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                  End Date
                </Text>
                <Text strong>
                  {new Date(assessment.assessmentEndDate).toLocaleDateString()}
                </Text>
                <Text type="secondary" style={{ marginLeft: '8px' }}>
                  {new Date(assessment.assessmentEndDate).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </div>
              
              <div>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                  Total Students
                </Text>
                <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                  {assessment.examinees.length}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SubmissionsPageHeader; 