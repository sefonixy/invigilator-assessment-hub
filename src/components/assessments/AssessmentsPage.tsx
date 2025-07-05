import React, { useState, useMemo, useCallback } from 'react';
import { Card, Typography, Space, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import AssessmentFiltersComponent from './AssessmentFilters';
import AssessmentTable from './AssessmentTable';
import type { 
  AssessmentFilters, 
  AssessmentWithDetails,
  AssessmentActions
} from '../../types/assessment';
import { 
  getMockAssessmentsWithDetails,
  mockAreas,
  mockPrograms,
  mockCourses,
  filterAssessmentsByArea,
  filterAssessmentsByStatus,
  filterAssessmentsByProgram,
  filterAssessmentsByCourse
} from '../../data/assessmentData';
import { ASSESSMENT_ACTIONS } from '../../types/assessment';

const { Title } = Typography;

const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [filters, setFilters] = useState<AssessmentFilters>({});
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // Get all assessments data
  const allAssessments = useMemo(() => {
    return getMockAssessmentsWithDetails();
  }, []);

  // Apply filters to assessments
  const filteredAssessments = useMemo(() => {
    let result = [...allAssessments];

    // Apply area filter
    if (filters.areaId) {
      result = filterAssessmentsByArea(result, filters.areaId);
    }

    // Apply program filter
    if (filters.programId) {
      result = filterAssessmentsByProgram(result, filters.programId);
    }

    // Apply course filter
    if (filters.courseId) {
      result = filterAssessmentsByCourse(result, filters.courseId);
    }

    // Apply status filter
    if (filters.status) {
      result = filterAssessmentsByStatus(result, filters.status);
    }

    // Apply search term filter (if implemented)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(assessment => 
        assessment.name.toLowerCase().includes(searchLower) ||
        assessment.area.name.toLowerCase().includes(searchLower) ||
        assessment.course.name.toLowerCase().includes(searchLower) ||
        assessment.program.name.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [allAssessments, filters]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Partial<AssessmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Handle assessment actions
  const handleAction = useCallback(async (action: AssessmentActions, assessment: AssessmentWithDetails) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (action) {
        case ASSESSMENT_ACTIONS.MONITOR_EXAMINEES:
          // Navigate to track submissions page
          navigate(`/exam/${assessment.id}/submissions`);
          return; // Don't show loading state for navigation
          
        case ASSESSMENT_ACTIONS.SYNC_SUBMISSIONS:
          notification.success({
            message: 'Sync Submissions',
            description: `Synced submissions for "${assessment.name}"`
          });
          break;
          
        case ASSESSMENT_ACTIONS.VIEW_DETAILS:
          notification.info({
            message: 'View Details',
            description: `Viewing details for "${assessment.name}"`
          });
          break;
          
        case ASSESSMENT_ACTIONS.EDIT_ASSESSMENT:
          notification.info({
            message: 'Edit Assessment',
            description: `Editing "${assessment.name}"`
          });
          break;
          
        case ASSESSMENT_ACTIONS.DOWNLOAD_REPORTS:
          notification.success({
            message: 'Download Reports',
            description: `Downloading reports for "${assessment.name}"`
          });
          break;
          
        case ASSESSMENT_ACTIONS.EXPORT_DATA:
          notification.success({
            message: 'Export Data',
            description: `Exporting data for "${assessment.name}"`
          });
          break;
          
        default:
          notification.warning({
            message: 'Unknown Action',
            description: 'The requested action is not yet implemented'
          });
      }
    } catch {
      notification.error({
        message: 'Action Failed',
        description: 'Failed to perform the requested action. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle row selection
  const handleSelectionChange = useCallback((selectedKeys: string[]) => {
    setSelectedRowKeys(selectedKeys);
  }, []);

  return (
    <div style={{ 
      padding: '24px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Page Header */}
        <div>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            Downloaded Assessments
          </Title>
          <p style={{ 
            color: '#666', 
            fontSize: 16, 
            margin: '8px 0 0 0' 
          }}>
            Manage and monitor your downloaded assessments
          </p>
        </div>

        {/* Filters */}
        <Card 
          style={{ 
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <AssessmentFiltersComponent
            areas={mockAreas}
            programs={mockPrograms}
            courses={mockCourses}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            loading={loading}
          />
        </Card>

        {/* Results Summary */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: '#666'
        }}>
          <span>
            Showing {filteredAssessments.length} of {allAssessments.length} assessments
          </span>
          {selectedRowKeys.length > 0 && (
            <span>
              {selectedRowKeys.length} assessment{selectedRowKeys.length > 1 ? 's' : ''} selected
            </span>
          )}
        </div>

        {/* Assessment Table */}
        <Card 
          style={{ 
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <AssessmentTable
            assessments={filteredAssessments}
            loading={loading}
            onAction={handleAction}
            selectedRowKeys={selectedRowKeys}
            onSelectionChange={handleSelectionChange}
          />
        </Card>
      </Space>
    </div>
  );
};

export default AssessmentsPage; 