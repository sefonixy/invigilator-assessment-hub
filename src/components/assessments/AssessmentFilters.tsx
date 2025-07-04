import React, { useMemo } from 'react';
import { Row, Col, Select, Button, Space } from 'antd';
import { ClearOutlined, FilterOutlined } from '@ant-design/icons';
import type { 
  AssessmentFiltersProps
} from '../../types/assessment';
import { ASSESSMENT_STATUS, type AssessmentStatus } from '../../types/assessment';
import { getProgramsByArea, getCoursesByProgram } from '../../data/assessmentData';

const AssessmentFiltersComponent: React.FC<AssessmentFiltersProps> = ({
  areas,
  programs,
  courses,
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false
}) => {
  // Get filtered programs based on selected area
  const filteredPrograms = useMemo(() => {
    if (!filters.areaId) return programs;
    return getProgramsByArea(filters.areaId);
  }, [filters.areaId, programs]);

  // Get filtered courses based on selected program
  const filteredCourses = useMemo(() => {
    if (!filters.programId) return courses;
    return getCoursesByProgram(filters.programId);
  }, [filters.programId, courses]);

  // Status options
  const statusOptions = [
    { label: 'Scheduled', value: ASSESSMENT_STATUS.SCHEDULED },
    { label: 'In Progress', value: ASSESSMENT_STATUS.IN_PROGRESS },
    { label: 'Completed', value: ASSESSMENT_STATUS.COMPLETED },
    { label: 'Cancelled', value: ASSESSMENT_STATUS.CANCELLED },
    { label: 'Paused', value: ASSESSMENT_STATUS.PAUSED }
  ];

  // Area options
  const areaOptions = areas.map(area => ({
    label: area.name,
    value: area.id
  }));

  // Program options
  const programOptions = filteredPrograms.map(program => ({
    label: program.name,
    value: program.id
  }));

  // Course options
  const courseOptions = filteredCourses.map(course => ({
    label: `${course.code} - ${course.name}`,
    value: course.id
  }));

  const handleAreaChange = (areaId?: string) => {
    onFiltersChange({
      areaId,
      // Clear dependent filters when area changes
      programId: undefined,
      courseId: undefined
    });
  };

  const handleProgramChange = (programId?: string) => {
    onFiltersChange({
      programId,
      // Clear dependent filter when program changes
      courseId: undefined
    });
  };

  const handleCourseChange = (courseId?: string) => {
    onFiltersChange({ courseId });
  };

  const handleStatusChange = (status?: AssessmentStatus) => {
    onFiltersChange({ status });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#fafafa',
      borderRadius: 6,
      marginBottom: 16
    }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 4, 
              fontWeight: 500,
              fontSize: 14 
            }}>
              Area
            </label>
            <Select
              placeholder="Select Area"
              style={{ width: '100%' }}
              value={filters.areaId}
              onChange={handleAreaChange}
              allowClear
              disabled={loading}
              options={areaOptions}
              suffixIcon={<FilterOutlined />}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 4, 
              fontWeight: 500,
              fontSize: 14 
            }}>
              Program
            </label>
            <Select
              placeholder="Select Program"
              style={{ width: '100%' }}
              value={filters.programId}
              onChange={handleProgramChange}
              allowClear
              disabled={loading || !filters.areaId}
              options={programOptions}
              suffixIcon={<FilterOutlined />}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 4, 
              fontWeight: 500,
              fontSize: 14 
            }}>
              Course
            </label>
            <Select
              placeholder="Select Course"
              style={{ width: '100%' }}
              value={filters.courseId}
              onChange={handleCourseChange}
              allowClear
              disabled={loading || !filters.programId}
              options={courseOptions}
              suffixIcon={<FilterOutlined />}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 4, 
              fontWeight: 500,
              fontSize: 14 
            }}>
              Exam/Assessment Status
            </label>
            <Select
              placeholder="Select Status"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={handleStatusChange}
              allowClear
              disabled={loading}
              options={statusOptions}
              suffixIcon={<FilterOutlined />}
            />
          </div>
        </Col>
      </Row>

      {hasActiveFilters && (
        <Row style={{ marginTop: 12 }}>
          <Col span={24}>
            <Space align="center" style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button
                type="default"
                icon={<ClearOutlined />}
                onClick={onClearFilters}
                disabled={loading}
                size="small"
              >
                Clear Filters
              </Button>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AssessmentFiltersComponent; 