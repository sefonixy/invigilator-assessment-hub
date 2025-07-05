import React from 'react';
import { Table, Tag, Button, Dropdown, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { MenuProps } from 'antd';
import { 
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MoreOutlined,
  ReloadOutlined,
  LockOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { 
  SubmissionsTableProps, 
  ExamineeSubmission,
  SubmissionStatus
} from '../../types/examinee';
import { useAppContext } from '../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  loading = false,
  onExamineeClick,
  onStatusAction,
  selectedRowKeys = [],
  onSelectionChange
}) => {
  const { t } = useTranslation();
  const { isCompact } = useAppContext();

  // Status tag rendering
  const renderStatusTag = (status: SubmissionStatus) => {
    const statusConfig = {
      'Present': { color: 'green', icon: <CheckCircleOutlined /> },
      'Student Submission': { color: 'blue', icon: <FileTextOutlined /> },
      'Pending': { color: 'orange', icon: <ClockCircleOutlined /> },
      'Auto Locked': { color: 'red', icon: <LockOutlined /> },
      'Absent': { color: 'red', icon: <CloseCircleOutlined /> },
      'Moved to Paper': { color: 'purple', icon: <FileTextOutlined /> }
    };

    const config = statusConfig[status];
    return (
      <Tag color={config?.color} icon={config?.icon}>
        {status}
      </Tag>
    );
  };

  // Get action menu items based on status
  const getActionMenuItems = (examinee: ExamineeSubmission): MenuProps['items'] => {
    const baseItems = [
      {
        key: 'view-details',
        label: 'View Details',
        icon: <UserOutlined />
      }
    ];

    switch (examinee.status) {
      case 'Present':
        return [
          ...baseItems,
          {
            key: 'reset-timer',
            label: 'Reset Session Timer',
            icon: <ClockCircleOutlined />
          },
          {
            key: 'restart-session',
            label: 'Restart Session',
            icon: <ReloadOutlined />,
            danger: true
          }
        ];

      case 'Student Submission':
        return [
          ...baseItems,
          {
            key: 'reset-timer',
            label: 'Reset Session Timer',
            icon: <ClockCircleOutlined />
          },
          {
            key: 'restart-session',
            label: 'Restart Session',
            icon: <ReloadOutlined />,
            danger: true
          },
          {
            key: 'finalize-submission',
            label: 'Finalize Submission',
            icon: <CheckCircleOutlined />
          }
        ];

      case 'Absent':
        return [
          ...baseItems,
          {
            key: 'switch-to-paper',
            label: 'Switch to Paper Mode',
            icon: <FileTextOutlined />
          },
          {
            key: 'mark-present',
            label: 'Mark as Present',
            icon: <CheckCircleOutlined />
          }
        ];

      case 'Pending':
        return [
          ...baseItems,
          {
            key: 'force-start',
            label: 'Force Start Exam',
            icon: <CheckCircleOutlined />
          },
          {
            key: 'mark-absent',
            label: 'Mark as Absent',
            icon: <CloseCircleOutlined />,
            danger: true
          }
        ];

      case 'Auto Locked':
        return [
          ...baseItems,
          {
            key: 'unlock-session',
            label: 'Unlock Session',
            icon: <LockOutlined />
          },
          {
            key: 'switch-to-paper',
            label: 'Switch to Paper Mode',
            icon: <FileTextOutlined />
          }
        ];

      case 'Moved to Paper':
        return [
          ...baseItems,
          {
            key: 'switch-to-digital',
            label: 'Switch to Digital Mode',
            icon: <ReloadOutlined />
          }
        ];

      default:
        return baseItems;
    }
  };

  // Handle action menu click
  const handleActionClick = (key: string, examinee: ExamineeSubmission) => {
    if (key === 'view-details') {
      onExamineeClick(examinee);
    } else {
      onStatusAction(key, examinee);
    }
  };

  // Table columns
  const columns: ColumnsType<ExamineeSubmission> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (username, record) => (
        <Link 
          onClick={() => onExamineeClick(record)}
          style={{ fontWeight: 500 }}
        >
          {username}
        </Link>
      )
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (name) => <Text strong>{name}</Text>
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      width: 80,
      align: 'center',
      render: (login: boolean) => (
        <Tag color={login ? 'green' : 'red'} icon={login ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
          {login ? 'Yes' : 'No'}
        </Tag>
      )
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      width: 80,
      align: 'center',
      render: (start: boolean) => (
        <Tag color={start ? 'green' : 'red'} icon={start ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
          {start ? 'Yes' : 'No'}
        </Tag>
      )
    },
    {
      title: 'Questions Synced',
      key: 'questionsSynced',
      width: 140,
      align: 'center',
      render: (_, record) => (
        <div>
          <Text strong>{record.questionsSynced}/{record.totalQuestions}</Text>
          {record.questionsSynced === record.totalQuestions && record.totalQuestions > 0 && (
            <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
          )}
        </div>
      )
    },
    {
      title: 'Time Elapsed',
      dataIndex: 'timeElapsed',
      key: 'timeElapsed',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.timeElapsed.localeCompare(b.timeElapsed),
      render: (time) => (
        <Text code style={{ fontSize: 13 }}>{time}</Text>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      align: 'center',
      filters: [
        { text: 'Present', value: 'Present' },
        { text: 'Student Submission', value: 'Student Submission' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Auto Locked', value: 'Auto Locked' },
        { text: 'Absent', value: 'Absent' },
        { text: 'Moved to Paper', value: 'Moved to Paper' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => renderStatusTag(status)
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        const menuItems = getActionMenuItems(record);
        return (
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => handleActionClick(key, record)
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />}
              style={{ padding: 0 }}
            />
          </Dropdown>
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={submissions}
      loading={loading}
      rowKey="username"
      size={isCompact ? 'small' : 'middle'}
      scroll={{ x: isCompact ? 800 : 1000 }}
      pagination={{
        total: submissions.length,
        pageSize: isCompact ? 20 : 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} ${t('common.of')} ${total} ${t('submissions.examinees')}`,
        pageSizeOptions: isCompact ? ['20', '50', '100'] : ['10', '50', '100'],
        size: isCompact ? 'small' : 'default'
      }}
      rowSelection={{
        selectedRowKeys,
        onChange: (selectedRowKeys) => onSelectionChange?.(selectedRowKeys.map(String)),
        type: 'checkbox',
      }}
      onRow={(record) => ({
        onClick: () => onExamineeClick(record),
        style: { 
          cursor: 'pointer',
          fontSize: isCompact ? '12px' : '14px'
        },
        className: `row-${record.status.toLowerCase().replace(' ', '-')}`
      })}
      style={{
        fontSize: isCompact ? '12px' : '14px'
      }}
      className={isCompact ? 'compact-table' : ''}
    />
  );
};

export default SubmissionsTable; 