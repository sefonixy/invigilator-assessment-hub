import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssessmentTable from '../AssessmentTable';
import type { Assessment } from '../../../types/data';

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
    examinees: [
              {
          id: 'EX001',
          username: 'student1',
          fullName: 'John Doe',
          login: true,
          start: true,
          questionsSynced: 15,
          timeElapsed: '1 hr 30 min',
          status: 'Student Submission',
          groupName: '6A',
          platform: 'Windows',
          ipAddress: '192.168.1.1',
          sessionHealth: 'Good',
          activityTimeline: []
        }
    ]
  },
  {
    id: 'ASMT002',
    areaName: '(North)',
    assessmentName: 'Mathematics Final',
    program: 'Mathematics',
    course: 'Grade 8',
    assessmentStartDate: '2024-11-26T11:00:00Z',
    assessmentEndDate: '2024-11-26T13:00:00Z',
    assessmentStatus: 'Finished',
    examinees: []
  }
];

const defaultProps = {
  assessments: mockAssessments,
  loading: false,
  onAction: jest.fn(),
  selectedRowKeys: [],
  onSelectionChange: jest.fn(),
  syncingAssessments: new Set<string>()
};

describe('<AssessmentTable /> - Basic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render table with assessment data', () => {
    render(<AssessmentTable {...defaultProps} />);
    
    expect(screen.getByText('General Science Exam - Nov ACU')).toBeInTheDocument();
    expect(screen.getByText('Mathematics Final')).toBeInTheDocument();
    expect(screen.getByText('(Central)')).toBeInTheDocument();
    expect(screen.getByText('(North)')).toBeInTheDocument();
  });

  test('should display "No data" when assessments array is empty', () => {
    render(<AssessmentTable {...defaultProps} assessments={[]} />);
    expect(screen.getAllByText('No data').length).toBeGreaterThan(0);
  });

  test('should call onAction when monitor button is clicked', () => {
    const mockOnAction = jest.fn();
    render(<AssessmentTable {...defaultProps} onAction={mockOnAction} />);
    
    const monitorButton = screen.getByRole('button', { name: /user 1/i });
    fireEvent.click(monitorButton);
    
    expect(mockOnAction).toHaveBeenCalledWith('monitor_examinees', mockAssessments[0]);
  });

    test('should show loading state', () => {
    render(<AssessmentTable {...defaultProps} loading={true} />);
    
    const table = document.querySelector('.ant-table-wrapper');
     expect(table).toBeInTheDocument();
   });
 }); 