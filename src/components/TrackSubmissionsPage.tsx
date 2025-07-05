import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Row, Col, Statistic, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import SubmissionsFilter from './submissions/SubmissionsFilter';
import SubmissionsTable from './submissions/SubmissionsTable';
import ExamineeDetailsModal from './submissions/ExamineeDetailsModal';
import { mockAssessmentsData } from '../services/mockData';
import type { Assessment, Examinee } from '../types/data';

const { Title, Text } = Typography;

const TrackSubmissionsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [filteredExaminees, setFilteredExaminees] = useState<Examinee[]>([]);
  const [selectedExaminee, setSelectedExaminee] = useState<Examinee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    areaName: '',
    groupName: '',
    examineeSearch: '',
    examSessionStatus: 'All'
  });

  useEffect(() => {
    if (examId) {
      const foundAssessment = mockAssessmentsData.find(a => a.id === examId);
      if (foundAssessment) {
        setAssessment(foundAssessment);
        setFilteredExaminees(foundAssessment.examinees);
      }
    }
  }, [examId]);

  // Calculate statistics
  const statistics = useMemo(() => {
    if (!assessment) return { total: 0, present: 0, absent: 0, completed: 0, pending: 0 };
    
    const examinees = assessment.examinees;
    const total = examinees.length;
    const present = examinees.filter(e => e.login && e.start).length;
    const absent = examinees.filter(e => e.status === 'Absent').length;
    const completed = examinees.filter(e => e.status === 'Student Submission').length;
    const pending = examinees.filter(e => e.status === 'Pending' || e.status === 'Not Started').length;
    
    return { total, present, absent, completed, pending };
  }, [assessment]);

  const handleFilterChange = (newFilters: {
    areaName: string;
    groupName: string;
    examineeSearch: string;
    examSessionStatus: string;
  }) => {
    setFilters(newFilters);
    
    if (!assessment) return;
    
    let filtered = [...assessment.examinees];
    
    // Apply filters
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

  if (!assessment) {
    return (
      <div style={{ padding: '20px' }}>
        <Text>Assessment not found</Text>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '16px 24px',
        borderBottom: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Space>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/assessments')}
            style={{ color: 'white' }}
          >
            common.backToAssessments
          </Button>
          <div style={{ marginLeft: '16px' }}>
            <Title level={4} style={{ color: 'white', margin: 0 }}>
              submissions.title
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              {assessment.program} - {assessment.assessmentName}
            </Text>
          </div>
        </Space>
        <div style={{ float: 'right', color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
          submissions.examId: assess-1<br />
          submissions.duration: 2h 30m
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Card style={{ textAlign: 'center', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' }}>
              <Statistic
                title="submissions.summary.total"
                value={statistics.total}
                valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Card style={{ textAlign: 'center', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <Statistic
                title="submissions.summary.present"
                value={statistics.present}
                valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Card style={{ textAlign: 'center', backgroundColor: '#fff2e8', border: '1px solid #ffbb96' }}>
              <Statistic
                title="submissions.summary.absent"
                value={statistics.absent}
                valueStyle={{ color: '#fa541c', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Card style={{ textAlign: 'center', backgroundColor: '#f9f0ff', border: '1px solid #d3adf7' }}>
              <Statistic
                title="submissions.summary.completed"
                value={statistics.completed}
                valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Card style={{ textAlign: 'center', backgroundColor: '#fffbe6', border: '1px solid #ffe58f' }}>
              <Statistic
                title="submissions.summary.pending"
                value={statistics.pending}
                valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>



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
          {filteredExaminees.length} submissions.results.showing {' '}
          {statistics.present} submissions.results.active {' '}
          {statistics.completed} submissions.results.completed
        </div>

        {/* Submissions Table */}
        <SubmissionsTable
          examinees={filteredExaminees}
          onExamineeClick={handleExamineeClick}
        />

        {/* Examinee Details Modal */}
        <ExamineeDetailsModal
          visible={isModalVisible}
          examinee={selectedExaminee}
          onClose={handleModalClose}
          assessment={assessment}
        />
      </div>
    </div>
  );
};

export default TrackSubmissionsPage; 