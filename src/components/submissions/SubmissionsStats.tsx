import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  UserOutlined 
} from '@ant-design/icons';
import type { Examinee } from '../../types/data';

interface SubmissionsStatsProps {
  examinees: Examinee[];
  filteredExaminees: Examinee[];
}

const SubmissionsStats: React.FC<SubmissionsStatsProps> = ({
  examinees,
  filteredExaminees
}) => {
  const stats = useMemo(() => {
    const total = examinees.length;
    const completed = examinees.filter(e => e.status === 'Student Submission').length;
    const pending = examinees.filter(e => e.status === 'Pending' || e.status === 'Not Started').length;
    const issues = examinees.filter(e => 
      e.status === 'Auto Locked' || 
      e.status === 'Absent' || 
      e.sessionHealth === 'Needs Attention'
    ).length;
    const active = examinees.filter(e => 
      e.login && e.start && e.status !== 'Student Submission'
    ).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      issues,
      active,
      completionRate
    };
  }, [examinees]);

  return (
    <Card 
      title="Submission Overview" 
      style={{ marginBottom: '16px' }}
      bodyStyle={{ padding: '16px' }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6} md={6} lg={4}>
          <Statistic
            title="Total Students"
            value={stats.total}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={4}>
          <Statistic
            title="Completed"
            value={stats.completed}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={4}>
          <Statistic
            title="Active Sessions"
            value={stats.active}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={4}>
          <Statistic
            title="Pending"
            value={stats.pending}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={4}>
          <Statistic
            title="Issues"
            value={stats.issues}
            prefix={<ExclamationCircleOutlined />}
            valueStyle={{ color: '#ff4d4f' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={8}>
          <div>
            <div style={{ marginBottom: '8px', fontWeight: 500 }}>
              Completion Rate
            </div>
            <Progress 
              percent={stats.completionRate} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              format={(percent) => `${percent}%`}
            />
            <div style={{ 
              fontSize: '12px', 
              color: '#666',
              marginTop: '4px' 
            }}>
              {stats.completed} of {stats.total} students completed
            </div>
          </div>
        </Col>
      </Row>
      
      {filteredExaminees.length !== examinees.length && (
        <div style={{ 
          marginTop: '16px',
          padding: '8px 12px',
          backgroundColor: '#f0f9ff',
          borderRadius: '4px',
          border: '1px solid #91d5ff',
          fontSize: '14px'
        }}>
          <strong>Filter Applied:</strong> Showing {filteredExaminees.length} of {examinees.length} students
        </div>
      )}
    </Card>
  );
};

export default SubmissionsStats; 