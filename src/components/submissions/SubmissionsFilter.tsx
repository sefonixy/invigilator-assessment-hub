import React from 'react';
import { Row, Col, Select, Input, TreeSelect } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { Examinee } from '../../types/data';
import type { TreeSelectProps } from 'antd';

interface SubmissionsFilterProps {
  onFilterChange: (filters: FilterType) => void;
  filters: FilterType;
  examinees?: Examinee[];
}

interface FilterType {
  areaName: string;
  groupName: string;
  examineeSearch: string;
  examSessionStatus: string;
}

const SubmissionsFilter: React.FC<SubmissionsFilterProps> = ({
  onFilterChange,
  filters
}) => {

  const handleChange = (field: string, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  // Hierarchical data for TreeSelect: Campus > Building > Floor > Group
  const treeData: TreeSelectProps['treeData'] = [
    {
      title: 'Main Campus',
      value: 'main-campus',
      key: 'main-campus',
      children: [
        {
          title: 'Engineering Building',
          value: 'engineering-building',
          key: 'engineering-building',
          children: [
            {
              title: 'Floor 1',
              value: 'eng-floor-1',
              key: 'eng-floor-1',
              children: [
                { title: 'Group A - Morning', value: 'Group A - Morning', key: 'group-a-morning' },
                { title: 'Group B - Morning', value: 'Group B - Morning', key: 'group-b-morning' },
              ]
            },
            {
              title: 'Floor 2',
              value: 'eng-floor-2',
              key: 'eng-floor-2',
              children: [
                { title: 'Group C - Afternoon', value: 'Group C - Afternoon', key: 'group-c-afternoon' },
                { title: 'Group D - Afternoon', value: 'Group D - Afternoon', key: 'group-d-afternoon' },
              ]
            }
          ]
        },
        {
          title: 'Science Building',
          value: 'science-building',
          key: 'science-building',
          children: [
            {
              title: 'Floor 1',
              value: 'sci-floor-1',
              key: 'sci-floor-1',
              children: [
                { title: 'Group E - Evening', value: 'Group E - Evening', key: 'group-e-evening' },
                { title: 'Group F - Evening', value: 'Group F - Evening', key: 'group-f-evening' },
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'North Campus',
      value: 'north-campus',
      key: 'north-campus',
      children: [
        {
          title: 'Business Building',
          value: 'business-building',
          key: 'business-building',
          children: [
            {
              title: 'Floor 3',
              value: 'bus-floor-3',
              key: 'bus-floor-3',
              children: [
                { title: 'Group G - Special', value: 'Group G - Special', key: 'group-g-special' },
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <div style={{ 
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '6px',
      marginBottom: '16px',
      border: '1px solid #d9d9d9'
    }}>
      <Row gutter={[16, 16]}>
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
              onChange={(value) => handleChange('areaName', value)}
              allowClear
            >
              <Select.Option value="">All Areas</Select.Option>
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
              Groups
            </label>
            <TreeSelect
              placeholder="Select Groups"
              style={{ width: '100%' }}
              value={filters.groupName || undefined}
              onChange={(value) => handleChange('groupName', value || '')}
              allowClear
              treeData={treeData}
              treeDefaultExpandAll={false}
              showSearch
              treeNodeFilterProp="title"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
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
              Examinees
            </label>
            <Input
              placeholder="Search examinees by username or name"
              value={filters.examineeSearch}
              onChange={(e) => handleChange('examineeSearch', e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
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
              Exam Session Status
            </label>
            <Select
              placeholder="Select Status"
              style={{ width: '100%' }}
              value={filters.examSessionStatus}
              onChange={(value) => handleChange('examSessionStatus', value)}
            >
              <Select.Option value="All">All Sessions</Select.Option>
              <Select.Option value="Active">Active Sessions</Select.Option>
              <Select.Option value="Completed">Completed Sessions</Select.Option>
              <Select.Option value="Pending">Pending Sessions</Select.Option>
              <Select.Option value="Issues">Sessions with Issues</Select.Option>
            </Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubmissionsFilter; 