import { filterAssessments, type AssessmentFilters } from '../filterLogic';
import type { Assessment } from '../../types/data';

const mockAssessments: Assessment[] = [
  {
    id: 'ASMT001',
    areaName: '(Central)',
    assessmentName: 'General Science Exam - Nov ACU',
    program: 'Mixed Subjects',
    course: 'Grade 6',
    assessmentStartDate: '2024-11-25T09:00:00Z',
    assessmentEndDate: '2024-11-25T11:00:00Z',
    assessmentStatus: 'Ongoing',
    examinees: []
  },
  {
    id: 'ASMT002',
    areaName: '(North)',
    assessmentName: 'Mathematics Final',
    program: 'Mathematics',
    course: 'Grade 8',
    assessmentStartDate: '2024-11-26T10:00:00Z',
    assessmentEndDate: '2024-11-26T12:00:00Z',
    assessmentStatus: 'Finished',
    examinees: []
  },
  {
    id: 'ASMT003',
    areaName: '(South)',
    assessmentName: 'Physics Lab Practical',
    program: 'Natural Sciences',
    course: 'Grade 9',
    assessmentStartDate: '2024-11-28T13:00:00Z',
    assessmentEndDate: '2024-11-28T15:00:00Z',
    assessmentStatus: 'Closed',
    examinees: []
  }
];

describe('filterAssessments - Core Tests', () => {
  test('should return all assessments when no filters are applied', () => {
    const filters: AssessmentFilters = {};
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockAssessments);
  });

  test('should filter by assessment status', () => {
    const filters: AssessmentFilters = {
      status: 'Ongoing'
    };
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(1);
    expect(result[0].assessmentStatus).toBe('Ongoing');
  });

  test('should filter by area name', () => {
    const filters: AssessmentFilters = {
      areaName: '(Central)'
    };
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(1);
    expect(result[0].areaName).toBe('(Central)');
  });

  test('should search by assessment name (case insensitive)', () => {
    const filters: AssessmentFilters = {
      searchTerm: 'science'
    };
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(2); // Finds "Science" in name and "Sciences" in program
    expect(result.some(a => a.assessmentName.toLowerCase().includes('science'))).toBe(true);
  });

  test('should trim whitespace from search terms', () => {
    const filters: AssessmentFilters = {
      searchTerm: '  mathematics  '
    };
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(1);
    expect(result[0].assessmentName).toBe('Mathematics Final');
  });

  test('should return empty array when no matches found', () => {
    const filters: AssessmentFilters = {
      searchTerm: 'nonexistent'
    };
    const result = filterAssessments(mockAssessments, filters);
    expect(result).toHaveLength(0);
  });
}); 