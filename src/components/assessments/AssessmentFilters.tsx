import React, { useMemo } from 'react';
import { Row, Col, Select, Input, Button } from 'antd';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import type { Assessment } from '../../types/data';

interface AssessmentFiltersProps {
  assessments: Assessment[];
  filters: {
    areaName?: string;
    program?: string;
    course?: string;
    status?: string;
    searchTerm?: string;
  };
  onFiltersChange: (filters: Partial<{
    areaName?: string;
    program?: string;
    course?: string;
    status?: string;
    searchTerm?: string;
  }>) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

const AssessmentFilters: React.FC<AssessmentFiltersProps> = ({
  assessments,
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false
}) => {

  const { areas, programs, courses, statuses } = useMemo(() => {
    const areas = [...new Set(assessments.map(a => a.areaName))];
    const programs = [...new Set(assessments.map(a => a.program))];
    const courses = [...new Set(assessments.map(a => a.course))];
    const statuses = [...new Set(assessments.map(a => a.assessmentStatus))];
    
    return { areas, programs, courses, statuses };
  }, [assessments]);

  const handleFilterChange = (field: string, value: string | undefined) => {
    onFiltersChange({ [field]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fafafa',
      borderRadius: '8px 8px 0 0'
    }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={12} lg={6}>
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
              value={filters.areaName}
              onChange={(value) => handleFilterChange('areaName', value)}
              allowClear
              disabled={loading}
            >
              {areas.map(area => (
                <Select.Option key={area} value={area}>
                  {area}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
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
              value={filters.program}
              onChange={(value) => handleFilterChange('program', value)}
              allowClear
              disabled={loading}
            >
              {programs.map(program => (
                <Select.Option key={program} value={program}>
                  {program}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
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
              value={filters.course}
              onChange={(value) => handleFilterChange('course', value)}
              allowClear
              disabled={loading}
            >
              {courses.map(course => (
                <Select.Option key={course} value={course}>
                  {course}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
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
              onChange={(value) => handleFilterChange('status', value)}
              allowClear
              disabled={loading}
            >
              {statuses.map(status => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Input
            placeholder="Search assessments..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
        </Col>
        
        {hasActiveFilters && (
          <Col xs={24} sm={8} md={6} lg={4}>
            <Button
              icon={<ClearOutlined />}
              onClick={onClearFilters}
              disabled={loading}
              style={{ width: '100%' }}
            >
              Clear Filters
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AssessmentFilters; 