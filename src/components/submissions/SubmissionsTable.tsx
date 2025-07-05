import React from 'react';
import { Table, Tag, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { Examinee } from '../../types/data';

interface SubmissionsTableProps {
  examinees: Examinee[];
  onExamineeClick: (examinee: Examinee) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  examinees,
  onExamineeClick
}) => {

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

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: '#1890ff' }}>
          {text}
        </Button>
      )
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      align: 'center' as const,
      render: (login: boolean) => (
        <div style={{ 
          display: 'inline-block', 
          padding: '4px 8px', 
          borderRadius: '4px',
          backgroundColor: login ? '#f6ffed' : '#fff2f0',
          color: login ? '#52c41a' : '#ff4d4f',
          fontWeight: 500
        }}>
          {login ? 'Yes' : 'No'}
        </div>
      )
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      align: 'center' as const,
      render: (start: boolean) => (
        <div style={{ 
          display: 'inline-block', 
          padding: '4px 8px', 
          borderRadius: '4px',
          backgroundColor: start ? '#f6ffed' : '#fff2f0',
          color: start ? '#52c41a' : '#ff4d4f',
          fontWeight: 500
        }}>
          {start ? 'Yes' : 'No'}
        </div>
      )
    },
    {
      title: 'Questions Synced',
      dataIndex: 'questionsSynced',
      key: 'questionsSynced',
      align: 'center' as const,
      render: (synced: number) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: '8px' }}>{synced}/20</span>
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        </div>
      )
    },
    {
      title: 'Time Elapsed',
      dataIndex: 'timeElapsed',
      key: 'timeElapsed',
      align: 'center' as const,
      render: (time: string) => (
        <div style={{ 
          fontFamily: 'monospace', 
          backgroundColor: '#f5f5f5',
          padding: '4px 8px',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          {time}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (_: unknown, record: Examinee) => (
        <Button
          type="link"
          onClick={() => onExamineeClick(record)}
          style={{ padding: 0 }}
        >
          View Details
        </Button>
      )
    }
  ];

  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #d9d9d9'
    }}>
      <Table
        columns={columns}
        dataSource={examinees}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} examinees`
        }}
        scroll={{ x: 1000 }}
        size="middle"
      />
    </div>
  );
};

export default SubmissionsTable; 