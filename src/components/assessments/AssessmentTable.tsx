import React from 'react';
import { Table, Tag, Button, Space, Tooltip } from 'antd';
import { SyncOutlined, UserOutlined } from '@ant-design/icons';
import type { Assessment } from '../../types/data';

interface AssessmentTableProps {
  assessments: Assessment[];
  loading?: boolean;
  onAction: (action: string, assessment: Assessment) => void;
  selectedRowKeys: string[];
  onSelectionChange: (selectedKeys: string[]) => void;
  syncingAssessments?: Set<string>;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessments,
  loading = false,
  onAction,
  selectedRowKeys,
  onSelectionChange,
  syncingAssessments = new Set()
}) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'processing';
      case 'Scheduled':
        return 'default';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Area Name',
      dataIndex: 'areaName',
      key: 'areaName',
      sorter: (a: Assessment, b: Assessment) => a.areaName.localeCompare(b.areaName),
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Assessment Name',
      dataIndex: 'assessmentName',
      key: 'assessmentName',
      sorter: (a: Assessment, b: Assessment) => a.assessmentName.localeCompare(b.assessmentName),
      render: (text: string, record: Assessment) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>{text}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.course}</div>
        </div>
      )
    },
    {
      title: 'Assessment Start Date',
      dataIndex: 'assessmentStartDate',
      key: 'assessmentStartDate',
      sorter: (a: Assessment, b: Assessment) => new Date(a.assessmentStartDate).getTime() - new Date(b.assessmentStartDate).getTime(),
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    },
    {
      title: 'Assessment End Date',
      dataIndex: 'assessmentEndDate',
      key: 'assessmentEndDate',
      sorter: (a: Assessment, b: Assessment) => new Date(a.assessmentEndDate).getTime() - new Date(b.assessmentEndDate).getTime(),
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    },
    {
      title: 'Assessment Status',
      dataIndex: 'assessmentStatus',
      key: 'assessmentStatus',
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Scheduled', value: 'Scheduled' }
      ],
      onFilter: (value: unknown, record: Assessment) => record.assessmentStatus === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: 'Monitor Examinees',
      key: 'monitor',
      align: 'center' as const,
      render: (_: unknown, record: Assessment) => {
        const examineeCount = record.examineeCount;
        
        const commonStyles = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px',
          borderRadius: '6px',
          minWidth: '80px',
          height: '36px',
          fontWeight: 600,
          fontSize: '16px',
          border: '1px solid',
          textAlign: 'center' as const,
          verticalAlign: 'middle' as const
        };

        if (examineeCount === 0) {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="No examinees enrolled">
                <div style={{
                  ...commonStyles,
                  backgroundColor: '#f5f5f5',
                  color: '#999',
                  borderColor: '#e8e8e8',
                  cursor: 'not-allowed'
                }}>
                  <UserOutlined style={{ marginRight: 8, fontSize: '16px', color: '#999' }} />
                  <span>0</span>
                </div>
              </Tooltip>
            </div>
          );
        }
        
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={`Monitor ${examineeCount} examinee${examineeCount > 1 ? 's' : ''}`}>
              <Button
                type="default"
                style={{
                  ...commonStyles,
                  backgroundColor: '#e6f7ff',
                  borderColor: '#91d5ff',
                  color: '#1890ff',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => onAction('monitor_examinees', record)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#bae7ff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 144, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e6f7ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <UserOutlined style={{ 
                  marginRight: 8, 
                  fontSize: '16px',
                  color: '#1890ff'
                }} />
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: 600,
                  color: '#1890ff'
                }}>
                  {examineeCount}
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (_: unknown, record: Assessment) => (
        <Space>
          <Button
            type="link"
            icon={<SyncOutlined spin={syncingAssessments.has(record.id)} />}
            onClick={() => onAction('sync_submissions', record)}
            loading={syncingAssessments.has(record.id)}
            disabled={syncingAssessments.has(record.id)}
          >
            {syncingAssessments.has(record.id) ? 'Syncing...' : 'Sync Submissions'}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={assessments}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} assessments`
      }}
             rowSelection={{
         selectedRowKeys,
         onChange: (keys) => onSelectionChange(keys.map(k => String(k))),
         type: 'checkbox'
       }}
      scroll={{ x: 1200 }}
      size="middle"
    />
  );
};

export default AssessmentTable; 