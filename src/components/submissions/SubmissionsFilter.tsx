import React, { useMemo } from 'react';
import { Row, Col, Select, TreeSelect, AutoComplete, Button, Space } from 'antd';
import { ClearOutlined, FilterOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { 
  SubmissionsFilterProps,
  ExamSessionStatus
} from '../../types/examinee';

const SubmissionsFilter: React.FC<SubmissionsFilterProps> = ({
  areas,
  groups,
  examinees,
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false
}) => {

  // Convert groups to tree data structure for TreeSelect
  const treeData = useMemo(() => {
    return groups.map(group => ({
      title: `${group.name} (${group.examineesCount})`,
      value: group.id,
      key: group.id,
      children: group.children?.map(child => ({
        title: `${child.name} (${child.examineesCount})`,
        value: child.id,
        key: child.id
      }))
    }));
  }, [groups]);

  // Filter groups based on selected area
  const filteredTreeData = useMemo(() => {
    if (!filters.areaId) return treeData;
    return treeData.filter(group => {
      const groupData = groups.find(g => g.id === group.value);
      return groupData?.areaId === filters.areaId;
    });
  }, [treeData, filters.areaId, groups]);

  // Prepare examinee options for AutoComplete
  const examineeOptions = useMemo(() => {
    let filteredExaminees = examinees;

    // Filter by area if selected
    if (filters.areaId) {
      filteredExaminees = filteredExaminees.filter(e => e.areaId === filters.areaId);
    }

    // Filter by groups if selected
    if (filters.groupIds && filters.groupIds.length > 0) {
      filteredExaminees = filteredExaminees.filter(e => 
        filters.groupIds!.includes(e.groupId)
      );
    }

    return filteredExaminees.map(examinee => ({
      value: examinee.username,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            {examinee.username} - {examinee.fullName}
          </span>
          <span style={{ color: '#666', fontSize: 12 }}>
            {examinee.status}
          </span>
        </div>
      ),
      fullName: examinee.fullName,
      status: examinee.status
    }));
  }, [examinees, filters.areaId, filters.groupIds]);

  // Area options
  const areaOptions = areas.map(area => ({
    label: `${area.name} (${area.examineesCount} examinees)`,
    value: area.id
  }));

  // Exam session status options
  const statusOptions = [
    { label: 'All Sessions', value: 'All' },
    { label: 'Active Sessions', value: 'Active' },
    { label: 'Completed Sessions', value: 'Completed' },
    { label: 'Pending Sessions', value: 'Pending' },
    { label: 'Sessions with Issues', value: 'Issues' }
  ];

  const handleAreaChange = (areaId?: string) => {
    onFiltersChange({
      areaId,
      // Clear dependent filters when area changes
      groupIds: undefined,
      examineeSearch: undefined
    });
  };

  const handleGroupsChange = (groupIds?: string[]) => {
    onFiltersChange({
      groupIds,
      // Clear dependent filter when groups change
      examineeSearch: undefined
    });
  };

  const handleExamineeSearch = (value: string) => {
    onFiltersChange({ examineeSearch: value });
  };

  const handleStatusChange = (status?: ExamSessionStatus) => {
    onFiltersChange({ examSessionStatus: status });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== '' && 
    !(Array.isArray(value) && value.length === 0)
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
              Groups
            </label>
            <TreeSelect
              placeholder="Select Groups"
              style={{ width: '100%' }}
              value={filters.groupIds}
              onChange={handleGroupsChange}
              treeData={filteredTreeData}
              multiple
              treeCheckable
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              allowClear
              disabled={loading || !filters.areaId}
              suffixIcon={<TeamOutlined />}
              treeDefaultExpandAll
              maxTagCount={2}
              maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
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
              Examinees
            </label>
            <AutoComplete
              placeholder="Search examinees by username or name"
              style={{ width: '100%' }}
              value={filters.examineeSearch}
              onChange={handleExamineeSearch}
              options={examineeOptions}
              allowClear
              disabled={loading}
              filterOption={(inputValue, option) => {
                const searchTerm = inputValue.toLowerCase();
                return (
                  option?.value.toLowerCase().includes(searchTerm) ||
                  option?.fullName?.toLowerCase().includes(searchTerm) ||
                  false
                );
              }}
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
              Exam Session Status
            </label>
            <Select
              placeholder="Select Status"
              style={{ width: '100%' }}
              value={filters.examSessionStatus}
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

export default SubmissionsFilter; 