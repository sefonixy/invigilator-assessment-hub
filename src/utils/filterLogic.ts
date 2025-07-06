import type { Assessment } from '../types/data';

export interface AssessmentFilters {
  areaName?: string;
  program?: string;
  course?: string;
  status?: string;
  searchTerm?: string;
}

/**
 * Filters assessments based on the provided filter criteria
 * @param assessments - Array of assessments to filter
 * @param filters - Filter criteria object
 * @returns Filtered array of assessments
 */
export const filterAssessments = (
  assessments: Assessment[], 
  filters: AssessmentFilters
): Assessment[] => {
  if (!assessments || assessments.length === 0) {
    return [];
  }

  let result = [...assessments];

  // Return all if no filters or all filter values are empty/undefined
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== '' && value !== 'all'
  );

  if (!hasActiveFilters) {
    return result;
  }

  // Apply area filter
  if (filters.areaName && filters.areaName !== 'all') {
    result = result.filter(assessment => assessment.areaName === filters.areaName);
  }

  // Apply program filter
  if (filters.program && filters.program !== 'all') {
    result = result.filter(assessment => assessment.program === filters.program);
  }

  // Apply course filter
  if (filters.course && filters.course !== 'all') {
    result = result.filter(assessment => assessment.course === filters.course);
  }

  // Apply status filter
  if (filters.status && filters.status !== 'all') {
    result = result.filter(assessment => assessment.assessmentStatus === filters.status);
  }

  // Apply search term filter (case-insensitive)
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