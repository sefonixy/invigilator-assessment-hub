import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Typography, Space, message, Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AssessmentFiltersComponent from './AssessmentFilters';
import AssessmentTable from './AssessmentTable';
import { mockAssessmentsData } from '../../services/mockData';
import { withRetry, classifyError, logError } from '../../utils/errorHandling';

// Simple accessibility helpers
const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
};
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
  const [retryCount, setRetryCount] = useState(0);
  const [assessmentsData, setAssessmentsData] = useState<Assessment[]>([]);

  // Load assessments data with enhanced error handling
  const loadAssessmentsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use withRetry for robust data loading
      const data = await withRetry(async () => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate potential API failure (reduced from 3% to 1% for better UX)
        if (Math.random() < 0.01) {
          throw new Error('Failed to load assessments data');
        }
        
        return mockAssessmentsData;
      }, { 
        maxAttempts: 3,
        delay: 1000,
        backoff: true 
      });
      
      setAssessmentsData(data);
      
      // Announce successful load to screen readers
      announceToScreenReader(`Loaded ${data.length} assessments successfully`);
      
    } catch (err) {
      const apiError = classifyError(err);
      setError(apiError.message);
      logError(apiError, { 
        component: 'AssessmentsPage',
        action: 'loadAssessmentsData',
        retryCount 
      });
      
      // Announce error to screen readers
      announceToScreenReader('Failed to load assessments. Please try again.', 'assertive');
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    loadAssessmentsData();
  }, [loadAssessmentsData]);

  const allAssessments = useMemo(() => {
    return assessmentsData || [];
  }, [assessmentsData]);

  const filteredAssessments = useMemo(() => {
    let result = [...allAssessments];

    if (filters.areaName) {
      result = result.filter(assessment => assessment.areaName === filters.areaName);
    }

    if (filters.program) {
      result = result.filter(assessment => assessment.program === filters.program);
    }

    if (filters.course) {
      result = result.filter(assessment => assessment.course === filters.course);
    }

    if (filters.status) {
      result = result.filter(assessment => assessment.assessmentStatus === filters.status);
    }

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

  const handleFiltersChange = useCallback((newFilters: Partial<AssessmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // Announce filter changes to screen readers
    const activeFilters = Object.values(newFilters).filter(Boolean).length;
    if (activeFilters > 0) {
      announceToScreenReader(`Filters applied. ${filteredAssessments.length} assessments found.`);
    }
  }, [filteredAssessments.length]);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    announceToScreenReader('All filters cleared');
  }, []);

  const handleAction = useCallback(async (action: string, assessment: Assessment) => {
    try {
      switch (action) {
        case 'monitor_examinees':
          // Navigate to track submissions page
          navigate(`/exam/${assessment.id}/submissions`);
          break;
        case 'sync_submissions':
          // Add assessment to syncing state
          setSyncingAssessments(prev => new Set([...prev, assessment.id]));
          
          // Use withRetry for sync operation
          await withRetry(async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate potential failure
            if (Math.random() < 0.1) {
              throw new Error('Sync operation failed');
            }
          }, { maxAttempts: 2 });
          
          // Show success message
          message.success(`Successfully synced submissions for "${assessment.assessmentName}".`);
          announceToScreenReader(`Sync completed for ${assessment.assessmentName}`, 'assertive');
          
          break;
        default:
          console.log(`Action ${action} for assessment:`, assessment.assessmentName);
      }
    } catch (err) {
      const apiError = classifyError(err);
      message.error(`Failed to ${action}: ${apiError.message}`);
      logError(apiError, { 
        component: 'AssessmentsPage',
        action,
        assessmentId: assessment.id 
      });
    } finally {
      // Remove from syncing state
      setSyncingAssessments(prev => {
        const newSet = new Set(prev);
        newSet.delete(assessment.id);
        return newSet;
      });
    }
  }, [navigate]);

  // Handle row selection
  const handleSelectionChange = useCallback((selectedKeys: string[]) => {
    setSelectedRowKeys(selectedKeys);
    
    // Announce selection changes
    if (selectedKeys.length > 0) {
      announceToScreenReader(`${selectedKeys.length} assessment${selectedKeys.length > 1 ? 's' : ''} selected`);
    }
  }, []);

  // Retry handler
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    loadAssessmentsData();
  }, [loadAssessmentsData]);

  // Error state with enhanced recovery options
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
            description={
              <div>
                <p>{error}</p>
                {retryCount > 0 && (
                  <p>Retry attempt: {retryCount}</p>
                )}
              </div>
            }
            type="error"
            showIcon
            action={
              <Button 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
                aria-label="Retry loading assessments"
              >
                Retry
              </Button>
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
                      aria-label="Filter options"
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
          aria-label="Assessments table"
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