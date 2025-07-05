import { useAppContext } from '../hooks/useAppContext';
import { THEME_CONSTANTS, getSpacing } from '../constants/theme';

const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isCompact } = useAppContext();
  
  const cardPadding = isCompact ? getSpacing('md', true) : getSpacing('lg');

  return (
    <div style={{ padding: `${getSpacing('lg')}px` }} className="fade-in">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme"
            style={{ 
              marginBottom: getSpacing('lg'),
              padding: cardPadding
            }}
          >
            <Title level={2} style={{ 
              marginBottom: getSpacing('lg'),
              fontSize: isCompact ? '20px' : '24px'
            }}>
              {t('assessments.title')}
            </Title>
            <Text type="secondary" style={{ 
              fontSize: isCompact ? '13px' : '14px'
            }}>
              {t('assessments.description')}
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Filter Card */}
        <Col span={24}>
          <Card 
            className="shadow-theme"
            style={{ marginBottom: getSpacing('md') }}
          >
            <AssessmentFilters
              filters={filters}
              onFiltersChange={setFilters}
              isLoading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Results Summary */}
        <Col span={24}>
          <Card 
            className="shadow-theme bg-content"
            size={isCompact ? 'small' : 'default'}
            style={{ marginBottom: getSpacing('md') }}
          >
            {/* ... existing code ... */}
          </Card>
        </Col>
      </Row>

      {/* Table Card */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="shadow-theme"
            style={{ padding: isCompact ? '12px' : '16px' }}
          >
            <AssessmentTable
              assessments={filteredAssessments}
              onMonitorClick={handleMonitorClick}
              isLoading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 