import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Breadcrumb, message, Alert } from 'antd';
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import SubmissionsFilter from './submissions/SubmissionsFilter';
import SubmissionsTable from './submissions/SubmissionsTable';
import ExamineeDetailsModal from './submissions/ExamineeDetailsModal';
import ActionModal from './submissions/ActionModals';
import { mockAssessmentsData } from '../services/mockData';
import type { Assessment, Examinee } from '../types/data';

const { Text } = Typography;

const TrackSubmissionsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [filteredExaminees, setFilteredExaminees] = useState<Examinee[]>([]);
  const [selectedExaminee, setSelectedExaminee] = useState<Examinee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    visible: boolean;
    type: 'paper' | 'unlock' | 'restart' | null;
    examinee: Examinee | null;
  }>({
    visible: false,
    type: null,
    examinee: null
  });
  const [filters, setFilters] = useState({
    areaName: '',
    groupName: '',
    examineeSearch: '',
    examSessionStatus: 'All'
  });

  useEffect(() => {
    const loadAssessmentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate potential API failure (5% chance)
        if (Math.random() < 0.05) {
          throw new Error('Failed to load assessment data');
        }
        
        if (examId) {
          const foundAssessment = mockAssessmentsData.find(a => a.id === examId);
          if (foundAssessment) {
            setAssessment(foundAssessment);
            setFilteredExaminees(foundAssessment.examinees);
          } else {
            setError('Assessment not found');
          }
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading assessment:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAssessmentData();
  }, [examId]);



  const handleFilterChange = (newFilters: {
    areaName: string;
    groupName: string;
    examineeSearch: string;
    examSessionStatus: string;
  }) => {
    setFilters(newFilters);
    
    if (!assessment) return;
    
    let filtered = [...assessment.examinees];
    
    if (newFilters.examSessionStatus && newFilters.examSessionStatus !== 'All') {
      switch (newFilters.examSessionStatus) {
        case 'Active':
          filtered = filtered.filter(e => e.login && e.start && e.status !== 'Student Submission');
          break;
        case 'Completed':
          filtered = filtered.filter(e => e.status === 'Student Submission');
          break;
        case 'Pending':
          filtered = filtered.filter(e => e.status === 'Pending' || e.status === 'Not Started');
          break;
        case 'Issues':
          filtered = filtered.filter(e => e.sessionHealth === 'Unstable Connection' || e.sessionHealth === 'Poor');
          break;
      }
    }
    
    if (newFilters.groupName) {
      filtered = filtered.filter(e => e.groupName === newFilters.groupName);
    }

    if (newFilters.examineeSearch) {
      const search = newFilters.examineeSearch.toLowerCase();
      filtered = filtered.filter(e => 
        e.fullName.toLowerCase().includes(search) ||
        e.username.toLowerCase().includes(search) ||
        e.groupName.toLowerCase().includes(search)
      );
    }
    
    setFilteredExaminees(filtered);
  };

  const handleExamineeClick = (examinee: Examinee) => {
    setSelectedExaminee(examinee);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedExaminee(null);
  };

  const handleActionClick = (action: string, examinee: Examinee) => {
    switch (action) {
      case 'switchToPaper':
        setActionModal({
          visible: true,
          type: 'paper',
          examinee
        });
        break;
      case 'unlock':
        setActionModal({
          visible: true,
          type: 'unlock',
          examinee
        });
        break;
      case 'restart':
        setActionModal({
          visible: true,
          type: 'restart',
          examinee
        });
        break;
      case 'resetTimer':
        message.success(`Session timer reset for ${examinee.fullName}`);
        // TODO: Implement actual reset timer logic
        break;
      case 'resume':
        message.info(`Resuming session for ${examinee.fullName}`);
        // TODO: Implement actual resume logic
        break;
      case 'start':
        message.info(`Starting exam session for ${examinee.fullName}`);
        // TODO: Implement actual start logic
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleActionConfirm = () => {
    if (!actionModal.examinee || !actionModal.type) return;

    const { examinee, type } = actionModal;
    
    switch (type) {
      case 'paper':
        // TODO: Implement switch to paper logic
        message.success(`${examinee.fullName} switched to paper mode`);
        break;
      case 'unlock':
        // TODO: Implement unlock session logic
        message.success(`Session unlocked for ${examinee.fullName}`);
        break;
      case 'restart':
        // TODO: Implement restart session logic
        message.success(`Session restarted for ${examinee.fullName}`);
        break;
    }

    setActionModal({
      visible: false,
      type: null,
      examinee: null
    });
  };

  const handleActionModalClose = () => {
    setActionModal({
      visible: false,
      type: null,
      examinee: null
    });
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Text>Loading assessment data...</Text>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ padding: '24px' }}>
          <Alert
            message="Error Loading Data"
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
        </div>
      </div>
    );
  }

  // Assessment not found state
  if (!assessment) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ padding: '24px' }}>
          <Alert
            message="Assessment Not Found"
            description="The requested assessment could not be found."
            type="warning"
            showIcon
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '16px 24px',
        borderBottom: '1px solid #e8e8e8',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
      }}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HomeOutlined style={{ marginRight: 4 }} />
                  <span>Home</span>
                </div>
              ),
            },
            {
              href: '/assessments',
              title: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FileTextOutlined style={{ marginRight: 4 }} />
                  <span>Downloaded Assessments</span>
                </div>
              ),
            },
            {
              title: `${assessment.assessmentName} - Submissions`,
            },
          ]}
                  style={{ fontSize: '14px' }}
      />
    </div>

    <div style={{ padding: window.innerWidth < 768 ? '16px' : '24px' }}>



      {/* Filters */}
        <SubmissionsFilter
          onFilterChange={handleFilterChange}
          filters={filters}
          examinees={assessment.examinees}
        />

        {/* Results Summary */}
        <div style={{ 
          marginBottom: '16px',
          color: '#666',
          fontSize: '14px'
        }}>
          Showing {filteredExaminees.length} examinees
        </div>

        {/* Submissions Table */}
        <SubmissionsTable
          examinees={filteredExaminees}
          onExamineeClick={handleExamineeClick}
          onActionClick={handleActionClick}
        />

        {/* Examinee Details Modal */}
        <ExamineeDetailsModal
          visible={isModalVisible}
          examinee={selectedExaminee}
          onClose={handleModalClose}
          assessment={assessment}
        />

        {/* Action Confirmation Modal */}
        {actionModal.visible && actionModal.type && actionModal.examinee && (
          <ActionModal
            visible={actionModal.visible}
            type={actionModal.type}
            examineeFullName={actionModal.examinee.fullName}
            onConfirm={handleActionConfirm}
            onCancel={handleActionModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default TrackSubmissionsPage; 