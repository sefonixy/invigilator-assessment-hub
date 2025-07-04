import type { 
  Area, 
  Program, 
  Course, 
  Assessment, 
  AssessmentWithDetails,
  AssessmentStatus
} from '../types/assessment';
import { ASSESSMENT_STATUS, ASSESSMENT_TYPE } from '../types/assessment';

// Mock Areas Data
export const mockAreas: Area[] = [
  { id: 'area-1', name: 'Humanities', code: 'HUM' },
  { id: 'area-2', name: 'Sciences', code: 'SCI' },
  { id: 'area-3', name: 'Arts', code: 'ART' },
  { id: 'area-4', name: 'Business', code: 'BUS' },
  { id: 'area-5', name: 'Engineering', code: 'ENG' }
];

// Mock Programs Data
export const mockPrograms: Program[] = [
  { id: 'prog-1', name: 'Literature Studies', code: 'LIT', areaId: 'area-1' },
  { id: 'prog-2', name: 'History', code: 'HIST', areaId: 'area-1' },
  { id: 'prog-3', name: 'Biology', code: 'BIO', areaId: 'area-2' },
  { id: 'prog-4', name: 'Chemistry', code: 'CHEM', areaId: 'area-2' },
  { id: 'prog-5', name: 'Fine Arts', code: 'FA', areaId: 'area-3' },
  { id: 'prog-6', name: 'Digital Arts', code: 'DA', areaId: 'area-3' },
  { id: 'prog-7', name: 'Business Administration', code: 'BA', areaId: 'area-4' },
  { id: 'prog-8', name: 'Marketing', code: 'MKT', areaId: 'area-4' },
  { id: 'prog-9', name: 'Computer Science', code: 'CS', areaId: 'area-5' },
  { id: 'prog-10', name: 'Mechanical Engineering', code: 'ME', areaId: 'area-5' }
];

// Mock Courses Data
export const mockCourses: Course[] = [
  { id: 'course-1', name: 'Modern Literature', code: 'LIT301', programId: 'prog-1' },
  { id: 'course-2', name: 'World History', code: 'HIST201', programId: 'prog-2' },
  { id: 'course-3', name: 'Molecular Biology', code: 'BIO401', programId: 'prog-3' },
  { id: 'course-4', name: 'Organic Chemistry', code: 'CHEM301', programId: 'prog-4' },
  { id: 'course-5', name: 'Studio Art', code: 'FA201', programId: 'prog-5' },
  { id: 'course-6', name: '3D Modeling', code: 'DA301', programId: 'prog-6' },
  { id: 'course-7', name: 'Strategic Management', code: 'BA401', programId: 'prog-7' },
  { id: 'course-8', name: 'Consumer Behavior', code: 'MKT301', programId: 'prog-8' },
  { id: 'course-9', name: 'Software Engineering', code: 'CS401', programId: 'prog-9' },
  { id: 'course-10', name: 'Thermodynamics', code: 'ME301', programId: 'prog-10' }
];

// Mock Assessments Data
export const mockAssessments: Assessment[] = [
  {
    id: 'assess-1',
    name: 'Midterm Exam',
    type: ASSESSMENT_TYPE.MIDTERM,
    areaId: 'area-1',
    programId: 'prog-1',
    courseId: 'course-1',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-15T11:00:00Z',
    status: ASSESSMENT_STATUS.COMPLETED,
    examineesCount: 145,
    totalSubmissions: 142,
    pendingSubmissions: 3,
    downloadedAt: '2024-03-10T08:00:00Z',
    lastSyncAt: '2024-03-15T11:30:00Z',
    invigilatorId: 'inv-1',
    isMonitored: true,
    allowLateSubmission: false,
    maxDuration: 120
  },
  {
    id: 'assess-2',
    name: 'Final Exam',
    type: ASSESSMENT_TYPE.FINAL,
    areaId: 'area-2',
    programId: 'prog-3',
    courseId: 'course-3',
    startDate: '2024-05-20T13:00:00Z',
    endDate: '2024-05-20T15:00:00Z',
    status: ASSESSMENT_STATUS.SCHEDULED,
    examineesCount: 89,
    totalSubmissions: 0,
    pendingSubmissions: 89,
    downloadedAt: '2024-05-15T10:00:00Z',
    lastSyncAt: null,
    invigilatorId: 'inv-1',
    isMonitored: true,
    allowLateSubmission: true,
    maxDuration: 120
  },
  {
    id: 'assess-3',
    name: 'Project Presentation',
    type: ASSESSMENT_TYPE.PRESENTATION,
    areaId: 'area-3',
    programId: 'prog-5',
    courseId: 'course-5',
    startDate: '2024-04-10T10:00:00Z',
    endDate: '2024-04-10T12:00:00Z',
    status: ASSESSMENT_STATUS.IN_PROGRESS,
    examineesCount: 67,
    totalSubmissions: 23,
    pendingSubmissions: 44,
    downloadedAt: '2024-04-08T09:00:00Z',
    lastSyncAt: '2024-04-10T10:45:00Z',
    invigilatorId: 'inv-1',
    isMonitored: true,
    allowLateSubmission: false,
    maxDuration: 120
  },
  {
    id: 'assess-4',
    name: 'Case Study Analysis',
    type: ASSESSMENT_TYPE.CASE_STUDY,
    areaId: 'area-4',
    programId: 'prog-7',
    courseId: 'course-7',
    startDate: '2024-06-05T14:00:00Z',
    endDate: '2024-06-05T16:00:00Z',
    status: ASSESSMENT_STATUS.COMPLETED,
    examineesCount: 134,
    totalSubmissions: 134,
    pendingSubmissions: 0,
    downloadedAt: '2024-06-01T12:00:00Z',
    lastSyncAt: '2024-06-05T16:15:00Z',
    invigilatorId: 'inv-1',
    isMonitored: true,
    allowLateSubmission: true,
    maxDuration: 120
  },
  {
    id: 'assess-5',
    name: 'Design Review',
    type: ASSESSMENT_TYPE.DESIGN_REVIEW,
    areaId: 'area-5',
    programId: 'prog-9',
    courseId: 'course-9',
    startDate: '2024-07-12T11:00:00Z',
    endDate: '2024-07-12T13:00:00Z',
    status: ASSESSMENT_STATUS.SCHEDULED,
    examineesCount: 78,
    totalSubmissions: 0,
    pendingSubmissions: 78,
    downloadedAt: '2024-07-08T14:00:00Z',
    lastSyncAt: null,
    invigilatorId: 'inv-1',
    isMonitored: true,
    allowLateSubmission: false,
    maxDuration: 120
  }
];

// Helper function to get assessment with details
export const getAssessmentWithDetails = (assessment: Assessment): AssessmentWithDetails => {
  const area = mockAreas.find(a => a.id === assessment.areaId)!;
  const program = mockPrograms.find(p => p.id === assessment.programId)!;
  const course = mockCourses.find(c => c.id === assessment.courseId)!;

  return {
    ...assessment,
    area,
    program,
    course
  };
};

// Get all assessments with details
export const getMockAssessmentsWithDetails = (): AssessmentWithDetails[] => {
  return mockAssessments.map(getAssessmentWithDetails);
};

// Filter functions
export const filterAssessmentsByArea = (assessments: AssessmentWithDetails[], areaId: string) => {
  return assessments.filter(assessment => assessment.areaId === areaId);
};

export const filterAssessmentsByStatus = (assessments: AssessmentWithDetails[], status: AssessmentStatus) => {
  return assessments.filter(assessment => assessment.status === status);
};

export const filterAssessmentsByProgram = (assessments: AssessmentWithDetails[], programId: string) => {
  return assessments.filter(assessment => assessment.programId === programId);
};

export const filterAssessmentsByCourse = (assessments: AssessmentWithDetails[], courseId: string) => {
  return assessments.filter(assessment => assessment.courseId === courseId);
};

// Get programs by area
export const getProgramsByArea = (areaId: string): Program[] => {
  return mockPrograms.filter(program => program.areaId === areaId);
};

// Get courses by program
export const getCoursesByProgram = (programId: string): Course[] => {
  return mockCourses.filter(course => course.programId === programId);
}; 