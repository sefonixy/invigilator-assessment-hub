import React, { useState, useMemo, useCallback } from 'react';
import { Card, Statistic, Row, Col, message, Typography, Button, Space, Divider } from 'antd';
import { 
  UserOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  MonitorOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import SubmissionsFilter from './SubmissionsFilter';
import SubmissionsTable from './SubmissionsTable';
import ExamineeDetailsModal from './ExamineeDetailsModal';
import type { 
  ExamineeSubmission, 
  ExamineeDetails,
  SubmissionFilters
} from '../../types/examinee';
import {
  mockExamineeAreas,
  mockExamineeGroups,
  mockExamineeSubmissions,
  getMockSubmissionsResponse,
  getExamineeDetails,
  filterSubmissionsByArea,
  filterSubmissionsByGroups,
  filterSubmissionsBySearch,
  filterSubmissionsByStatus
} from '../../data/examineeData';
import { useAppContext } from '../../hooks/useAppContext';
import { THEME_CONSTANTS, getSpacing } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const TrackSubmissionsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isCompact, isDark } = useAppContext();

  // State management
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [filters, setFilters] = useState<SubmissionFilters>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedExaminee, setSelectedExaminee] = useState<ExamineeDetails | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock data - in real app this would come from API
  const examData = getMockSubmissionsResponse();

  // Apply filters to submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = mockExamineeSubmissions;

    if (filters.areaId) {
      filtered = filterSubmissionsByArea(filtered, filters.areaId);
    }

    if (filters.groupIds && filters.groupIds.length > 0) {
      filtered = filterSubmissionsByGroups(filtered, filters.groupIds);
    }

    if (filters.examineeSearch) {
      filtered = filterSubmissionsBySearch(filtered, filters.examineeSearch);
    }

    if (filters.examSessionStatus && filters.examSessionStatus !== 'All') {
      filtered = filterSubmissionsByStatus(filtered, filters.examSessionStatus);
    }

    return filtered;
  }, [filters]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Partial<SubmissionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Handle examinee click (open details modal)
  const handleExamineeClick = useCallback(async (examinee: ExamineeSubmission) => {
    try {
      setDetailsLoading(true);
      setModalVisible(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const details = getExamineeDetails(examinee.id);
      setSelectedExaminee(details);
    } catch {
      message.error('Failed to load examinee details');
      setModalVisible(false);
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  // Handle status action
  const handleStatusAction = useCallback(async (action: string, examinee: ExamineeSubmission) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success messages based on action
      const actionMessages: Record<string, string> = {
        'reset-timer': `Session timer reset for ${examinee.fullName}`,
        'restart-session': `Session restarted for ${examinee.fullName}`,
        'switch-to-paper': `${examinee.fullName} switched to paper mode`,
        'mark-present': `${examinee.fullName} marked as present`,
        'force-start': `Exam force started for ${examinee.fullName}`,
        'mark-absent': `${examinee.fullName} marked as absent`,
        'unlock-session': `Session unlocked for ${examinee.fullName}`,
        'switch-to-digital': `${examinee.fullName} switched to digital mode`,
        'finalize-submission': `Submission finalized for ${examinee.fullName}`
      };

      message.success(actionMessages[action] || 'Action completed successfully');
    } catch {
      message.error('Failed to execute action');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle modal close
  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedExaminee(null);
  }, []);

  // Handle row selection
  const handleSelectionChange = useCallback((selectedKeys: string[]) => {
    setSelectedRowKeys(selectedKeys);
  }, []);

  // Calculate summary statistics from filtered data
  const summaryStats = useMemo(() => {
    const total = filteredSubmissions.length;
    const present = filteredSubmissions.filter(s => s.status === 'Present').length;
    const absent = filteredSubmissions.filter(s => s.status === 'Absent').length;
    const completed = filteredSubmissions.filter(s => s.status === 'Student Submission').length;
    const pending = filteredSubmissions.filter(s => s.status === 'Pending').length;

    return [
      { key: 'total', value: total, color: '#1890ff' },
      { key: 'present', value: present, color: '#52c41a' },
      { key: 'absent', value: absent, color: '#ff4d4f' },
      { key: 'completed', value: completed, color: '#722ed1' },
      { key: 'pending', value: pending, color: '#722ed1' }
    ];
  }, [filteredSubmissions]);

  const cardPadding = isCompact ? getSpacing('md', true) : getSpacing('lg');

  if (!examId) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Title level={3}>Exam not found</Title>
        <Text>Please select a valid exam to monitor.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: `${getSpacing('lg')}px` }} className="fade-in">
      {/* Header Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme bg-elevated"
            style={{ marginBottom: getSpacing('lg') }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: getSpacing('md')
            }}>
              <div>
                <Button
                  type="link"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate('/')}
                  style={{ 
                    padding: 0, 
                    fontSize: isCompact ? '13px' : '14px'
                  }}
                >
                  {t('common.backToAssessments')}
                </Button>
                <Title 
                  level={2} 
                  style={{ 
                    margin: `${getSpacing('sm')}px 0`,
                    fontSize: isCompact ? '20px' : '24px'
                  }}
                >
                  <MonitorOutlined style={{ marginRight: getSpacing('sm') }} />
                  {t('submissions.title')}
                </Title>
                <Text type="secondary" style={{ 
                  fontSize: isCompact ? '12px' : '13px'
                }}>
                  <CalendarOutlined style={{ marginRight: getSpacing('xs') }} />
                  Programming Fundamentals - Midterm Exam
                </Text>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text type="secondary" style={{ 
                  display: 'block', 
                  fontSize: isCompact ? '11px' : '12px'
                }}>
                  {t('submissions.examId')}: {examId}
                </Text>
                <Text type="secondary" style={{ 
                  fontSize: isCompact ? '11px' : '12px'
                }}>
                  {t('submissions.duration')}: 2h 30m
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Summary Statistics */}
      <Row gutter={[isCompact ? 12 : 16, isCompact ? 12 : 16]}>
        {summaryStats.map((stat) => (
          <Col xs={12} sm={6} key={stat.key}>
            <Card 
              className="shadow-theme theme-transition"
              size={isCompact ? 'small' : 'default'}
              style={{
                textAlign: 'center',
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.08)' 
                  : '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <Statistic
                title={
                  <Text style={{ 
                    fontSize: isCompact ? '11px' : '12px',
                    fontWeight: 500
                  }}>
                    {t(`submissions.summary.${stat.key}`)}
                  </Text>
                }
                value={stat.value}
                valueStyle={{
                  fontSize: isCompact ? '18px' : '20px',
                  fontWeight: 600,
                  color: stat.color
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider style={{ margin: `${getSpacing('lg')}px 0` }} />

      {/* Filters */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme"
            size={isCompact ? 'small' : 'default'}
            style={{ marginBottom: getSpacing('md') }}
          >
            <SubmissionsFilter
              areas={mockExamineeAreas}
              groups={mockExamineeGroups}
              examinees={mockExamineeSubmissions}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Results Summary */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme bg-content"
            size={isCompact ? 'small' : 'default'}
            style={{ marginBottom: getSpacing('md') }}
          >
            <Space split={<Divider type="vertical" />}>
              <Text style={{ fontSize: isCompact ? '12px' : '13px' }}>
                <strong>{filteredSubmissions.length}</strong> {t('submissions.results.showing')}
              </Text>
              <Text style={{ fontSize: isCompact ? '12px' : '13px' }}>
                <strong>{filteredSubmissions.filter(s => s.status === 'Present').length}</strong> {t('submissions.results.active')}
              </Text>
              <Text style={{ fontSize: isCompact ? '12px' : '13px' }}>
                <strong>{filteredSubmissions.filter(s => ['Student Submission', 'Auto Locked'].includes(s.status)).length}</strong> {t('submissions.results.completed')}
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Submissions Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme"
            style={{ padding: isCompact ? '8px' : '12px' }}
          >
            <SubmissionsTable
              submissions={filteredSubmissions}
              loading={loading}
              onExamineeClick={handleExamineeClick}
              onStatusAction={handleStatusAction}
              selectedRowKeys={selectedRowKeys}
              onSelectionChange={handleSelectionChange}
            />
          </Card>
        </Col>
      </Row>

      {/* Examinee Details Modal */}
      <ExamineeDetailsModal
        visible={modalVisible}
        examinee={selectedExaminee}
        onClose={handleModalClose}
        loading={detailsLoading}
      />
    </div>
  );
};

export default TrackSubmissionsPage; 