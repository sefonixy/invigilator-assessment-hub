import React from 'react';
import { Table, Tag, Button, Space, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'antd/es/table/interface';
import { 
  SyncOutlined, 
  UsergroupAddOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { 
  AssessmentTableProps, 
  AssessmentWithDetails
} from '../../types/assessment';
import { ASSESSMENT_STATUS, ASSESSMENT_ACTIONS } from '../../types/assessment';

const { Text } = Typography;

const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessments,
  loading = false,
  onAction,
  selectedRowKeys = [],
  onSelectionChange
}) => {

  // Status tag rendering
  const renderStatusTag = (status: string) => {
    const statusConfig = {
      [ASSESSMENT_STATUS.SCHEDULED]: { color: 'blue', icon: <ClockCircleOutlined /> },
      [ASSESSMENT_STATUS.IN_PROGRESS]: { color: 'orange', icon: <SyncOutlined spin /> },
      [ASSESSMENT_STATUS.COMPLETED]: { color: 'green', icon: <CheckCircleOutlined /> },
      [ASSESSMENT_STATUS.CANCELLED]: { color: 'red', icon: <ExclamationCircleOutlined /> },
      [ASSESSMENT_STATUS.PAUSED]: { color: 'purple', icon: <PauseCircleOutlined /> }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const displayText = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
      <Tag color={config?.color} icon={config?.icon}>
        {displayText}
      </Tag>
    );
  };

  // Table columns
  const columns: ColumnsType<AssessmentWithDetails> = [
    {
      title: 'Area Name',
      dataIndex: ['area', 'name'],
      key: 'areaName',
      width: 120,
      sorter: (a, b) => a.area.name.localeCompare(b.area.name),
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Assessment Name',
      dataIndex: 'name',
      key: 'assessmentName',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.course.code} - {record.course.name}
          </Text>
        </div>
      )
    },
    {
      title: 'Assessment Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 180,
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
      render: (date) => (
        <div>
          <div>{dayjs(date).format('YYYY-MM-DD')}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {dayjs(date).format('HH:mm A')}
          </Text>
        </div>
      )
    },
    {
      title: 'Assessment End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 180,
      sorter: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
      render: (date) => (
        <div>
          <div>{dayjs(date).format('YYYY-MM-DD')}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {dayjs(date).format('HH:mm A')}
          </Text>
        </div>
      )
    },
    {
      title: 'Assessment Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      align: 'center',
      filters: [
        { text: 'Scheduled', value: ASSESSMENT_STATUS.SCHEDULED },
        { text: 'In Progress', value: ASSESSMENT_STATUS.IN_PROGRESS },
        { text: 'Completed', value: ASSESSMENT_STATUS.COMPLETED },
        { text: 'Cancelled', value: ASSESSMENT_STATUS.CANCELLED },
        { text: 'Paused', value: ASSESSMENT_STATUS.PAUSED }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => renderStatusTag(status)
    },
    {
      title: 'Monitor Examinees',
      key: 'monitorExaminees',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <Tooltip title={`${record.examineesCount} examinees total`}>
          <Button
            type="link"
            icon={<UsergroupAddOutlined />}
            onClick={() => onAction(ASSESSMENT_ACTIONS.MONITOR_EXAMINEES, record)}
            style={{ padding: 0 }}
          >
            Monitor Examinees
          </Button>
        </Tooltip>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Sync Submissions">
            <Button
              type="link"
              icon={<SyncOutlined />}
              onClick={() => onAction(ASSESSMENT_ACTIONS.SYNC_SUBMISSIONS, record)}
              disabled={record.status === ASSESSMENT_STATUS.CANCELLED}
              style={{ padding: 0 }}
            >
              Sync Submissions
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ];

  // Row selection configuration
  const rowSelection = onSelectionChange ? {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      onSelectionChange(selectedRowKeys.map(key => String(key)));
    },
    type: 'checkbox' as const
  } : undefined;

  return (
    <Table<AssessmentWithDetails>
      columns={columns}
      dataSource={assessments}
      rowKey="id"
      loading={loading}
      rowSelection={rowSelection}
      scroll={{ x: 1200 }}
      pagination={{
        total: assessments.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} assessments`,
        pageSizeOptions: ['10', '20', '50', '100']
      }}
      size="middle"
      bordered
      style={{
        backgroundColor: 'white',
        borderRadius: 6
      }}
    />
  );
};

export default AssessmentTable; 