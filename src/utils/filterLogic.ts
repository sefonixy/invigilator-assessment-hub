import type { Assessment } from '../types/data';

export interface AssessmentFilters {
  areaName?: string;
  program?: string;
  course?: string;
  status?: string;
  searchTerm?: string;
}

export const filterAssessments = (
  assessments: Assessment[], 
  filters: AssessmentFilters
): Assessment[] => {
  if (!assessments || assessments.length === 0) {
    return [];
  }

  let result = [...assessments];

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== '' && value !== 'all'
  );

  if (!hasActiveFilters) {
    return result;
  }

  if (filters.areaName && filters.areaName !== 'all') {
    result = result.filter(assessment => assessment.areaName === filters.areaName);
  }

  if (filters.program && filters.program !== 'all') {
    result = result.filter(assessment => assessment.program === filters.program);
  }

  if (filters.course && filters.course !== 'all') {
    result = result.filter(assessment => assessment.course === filters.course);
  }

  if (filters.status && filters.status !== 'all') {
    result = result.filter(assessment => assessment.assessmentStatus === filters.status);
  }
  if (filters.searchTerm && filters.searchTerm.trim() !== '') {
    const searchLower = filters.searchTerm.trim().toLowerCase();
    result = result.filter(assessment => 
      assessment.assessmentName.toLowerCase().includes(searchLower) ||
      assessment.areaName.toLowerCase().includes(searchLower) ||
      assessment.course.toLowerCase().includes(searchLower) ||
      assessment.program.toLowerCase().includes(searchLower)
    );
  }

  return result;
}; 