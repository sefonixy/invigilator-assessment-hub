import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Typography, Space, message, Alert } from 'antd';
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
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [syncingAssessments, setSyncingAssessments] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [assessmentsData, setAssessmentsData] = useState<Assessment[]>([]);

  // Load assessments data with error handling
  useEffect(() => {
    const loadAssessmentsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate potential API failure (3% chance)
        if (Math.random() < 0.03) {
          throw new Error('Failed to load assessments data');
        }
        
        setAssessmentsData(mockAssessmentsData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading assessments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAssessmentsData();
  }, []);

  // Get all assessments data
  const allAssessments = useMemo(() => {
    return assessmentsData;
  }, [assessmentsData]);

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
        // Add assessment to syncing state
        setSyncingAssessments(prev => new Set([...prev, assessment.id]));
        
        // Simulate API call
        setTimeout(() => {
          // Remove from syncing state
          setSyncingAssessments(prev => {
            const newSet = new Set(prev);
            newSet.delete(assessment.id);
            return newSet;
          });
          
          // Show success message
          message.success(`Successfully synced submissions for "${assessment.assessmentName}".`);
        }, 2000); // 2 second delay to simulate API call
        break;
      default:
        console.log(`Action ${action} for assessment:`, assessment.assessmentName);
    }
  }, [navigate]);

  // Handle row selection
  const handleSelectionChange = useCallback((selectedKeys: string[]) => {
    setSelectedRowKeys(selectedKeys);
  }, []);

  // Error state
  if (error) {
    return (
      <div style={{ 
        padding: window.innerWidth < 768 ? '16px' : '24px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              Downloaded Assessments
            </Title>
          </div>
          <Alert
            message="Error Loading Assessments"
            description={error}
            type="error"
            showIcon
            action={
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  background: 'none',
                  border: '1px solid #ff4d4f',
                  color: '#ff4d4f',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            }
          />
        </Space>
      </div>
    );
  }

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
            syncingAssessments={syncingAssessments}
          />
        </Card>
      </Space>
    </div>
  );
};

export default AssessmentsPage; 