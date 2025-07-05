import React, { useState, useMemo, useCallback } from 'react';
import { Card, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import AssessmentFiltersComponent from './AssessmentFilters';
import AssessmentTable from './AssessmentTable';
import { mockAssessmentsData } from '../../services/mockData';
import type { Assessment } from '../../types/data';

const { Title } = Typography;

interface AssessmentFilters {
  areaName?: string;
  program?: string;
  course?: string;
  status?: string;
  searchTerm?: string;
}

const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [filters, setFilters] = useState<AssessmentFilters>({});
  const [loading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // Get all assessments data
  const allAssessments = useMemo(() => {
    return mockAssessmentsData;
  }, []);

  // Apply filters to assessments
  const filteredAssessments = useMemo(() => {
    let result = [...allAssessments];

    // Apply area filter
    if (filters.areaName) {
      result = result.filter(assessment => assessment.areaName === filters.areaName);
    }

    // Apply program filter
    if (filters.program) {
      result = result.filter(assessment => assessment.program === filters.program);
    }

    // Apply course filter
    if (filters.course) {
      result = result.filter(assessment => assessment.course === filters.course);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(assessment => assessment.assessmentStatus === filters.status);
    }

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(assessment => 
        assessment.assessmentName.toLowerCase().includes(searchLower) ||
        assessment.areaName.toLowerCase().includes(searchLower) ||
        assessment.course.toLowerCase().includes(searchLower) ||
        assessment.program.toLowerCase().includes(searchLower)
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
  const handleAction = useCallback((action: string, assessment: Assessment) => {
    switch (action) {
      case 'monitor_examinees':
        // Navigate to track submissions page
        navigate(`/exam/${assessment.id}/submissions`);
        break;
      case 'sync_submissions':
        console.log(`Syncing submissions for "${assessment.assessmentName}"`);
        break;
      default:
        console.log(`Action ${action} for assessment:`, assessment.assessmentName);
    }
  }, [navigate]);

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
            assessments={allAssessments}
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