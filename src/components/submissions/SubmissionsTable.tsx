import React from 'react';
import { Table, Tag, Button, Dropdown, Space } from 'antd';
import { CheckCircleOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { Examinee } from '../../types/data';

interface SubmissionsTableProps {
  examinees: Examinee[];
  onExamineeClick: (examinee: Examinee) => void;
  onActionClick: (action: string, examinee: Examinee) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  examinees,
  onExamineeClick,
  onActionClick
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
      case 'Auto Locked':
        return 'warning';
      case 'Moved to Paper':
        return 'purple';
      default:
        return 'default';
    }
  };

  const renderActionByStatus = (examinee: Examinee) => {
    switch (examinee.status) {
      case 'Absent':
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => onActionClick('switchToPaper', examinee)}
            style={{ backgroundColor: '#fa8c16', borderColor: '#fa8c16' }}
          >
            Switch to Paper
          </Button>
        );

      case 'Student Submission': {
        const submissionMenuItems: MenuProps['items'] = [
          {
            key: 'resetTimer',
            label: 'Reset Session Timer',
          },
          {
            key: 'restart',
            label: 'Restart Session',
            danger: true,
          },
        ];

        return (
          <Dropdown
            menu={{
              items: submissionMenuItems,
              onClick: ({ key }) => onActionClick(key, examinee)
            }}
            trigger={['click']}
          >
            <Button size="small">
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      }

      case 'Auto Locked':
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => onActionClick('unlock', examinee)}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Unlock Session
          </Button>
        );

      case 'Not Started':
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => onActionClick('start', examinee)}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Start
          </Button>
        );

      default:
        return (
          <Button
            type="link"
            size="small"
            onClick={() => onExamineeClick(examinee)}
            style={{ padding: 0 }}
          >
            View Details
          </Button>
        );
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: Examinee, b: Examinee) => a.username.localeCompare(b.username),
      render: (text: string, record: Examinee) => (
        <Button 
          type="link" 
          style={{ padding: 0, color: '#1890ff' }}
          onClick={() => onExamineeClick(record)}
        >
          {text}
        </Button>
      )
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a: Examinee, b: Examinee) => a.fullName.localeCompare(b.fullName),
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
      sorter: (a: Examinee, b: Examinee) => a.questionsSynced - b.questionsSynced,
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
      sorter: (a: Examinee, b: Examinee) => {
        // Convert time strings to minutes for sorting
        const timeToMinutes = (timeStr: string) => {
          if (timeStr === '-' || timeStr === 'N/A') return -1;
          
          let totalMinutes = 0;
          
          // Handle new format: "41 secs", "1 min, 31 secs", "2 hr, 15 min"
          const hrMatch = timeStr.match(/(\d+)\s*hr/);
          const minMatch = timeStr.match(/(\d+)\s*min/);
          const secMatch = timeStr.match(/(\d+)\s*secs?/);
          
          if (hrMatch) totalMinutes += parseInt(hrMatch[1]) * 60;
          if (minMatch) totalMinutes += parseInt(minMatch[1]);
          if (secMatch) totalMinutes += parseInt(secMatch[1]) / 60;
          
          return totalMinutes;
        };
        return timeToMinutes(a.timeElapsed) - timeToMinutes(b.timeElapsed);
      },
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
      sorter: (a: Examinee, b: Examinee) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (_: unknown, record: Examinee) => renderActionByStatus(record)
    }
  ];

  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #d9d9d9',
      overflow: 'hidden'
    }}>
      <style>
        {`
          .submissions-table .ant-table-thead > tr > th {
            padding: 16px 12px !important;
            background-color: #fafafa !important;
            border-bottom: 2px solid #f0f0f0 !important;
            font-weight: 600 !important;
            color: #262626 !important;
          }
          .submissions-table .ant-table-tbody > tr > td {
            padding: 16px 12px !important;
            border-bottom: 1px solid #f0f0f0 !important;
          }
          .submissions-table .ant-table-tbody > tr:hover > td {
            background-color: #f5f5f5 !important;
          }
          .submissions-table .ant-pagination {
            padding: 16px 24px !important;
          }
        `}
      </style>
      <Table
        className="submissions-table"
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
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default SubmissionsTable; 