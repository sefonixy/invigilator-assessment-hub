// Assessment Status Types
export const ASSESSMENT_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PAUSED: 'paused'
} as const;

export type AssessmentStatus = typeof ASSESSMENT_STATUS[keyof typeof ASSESSMENT_STATUS];

// Assessment Type Types
export const ASSESSMENT_TYPE = {
  MIDTERM: 'midterm',
  FINAL: 'final',
  QUIZ: 'quiz',
  PROJECT: 'project',
  PRESENTATION: 'presentation',
  CASE_STUDY: 'case_study',
  DESIGN_REVIEW: 'design_review'
} as const;

export type AssessmentType = typeof ASSESSMENT_TYPE[keyof typeof ASSESSMENT_TYPE];

// Base interfaces
export interface Area {
  id: string;
  name: string;
  code: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  areaId: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  programId: string;
}

// Main Assessment interface
export interface Assessment {
  id: string;
  name: string;
  type: AssessmentType;
  areaId: string;
  programId: string;
  courseId: string;
  startDate: string;
  endDate: string;
  status: AssessmentStatus;
  examineesCount: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  downloadedAt: string;
  lastSyncAt: string | null;
  invigilatorId: string;
  isMonitored: boolean;
  description?: string;
  instructions?: string;
  maxDuration?: number; // in minutes
  allowLateSubmission: boolean;
  submissionDeadline?: string;
}

// Extended interfaces with related data
export interface AssessmentWithDetails extends Assessment {
  area: Area;
  program: Program;
  course: Course;
}

// Filter interfaces
export interface AssessmentFilters {
  areaId?: string;
  programId?: string;
  courseId?: string;
  status?: AssessmentStatus;
  dateRange?: [string, string];
  searchTerm?: string;
}

// Table column configuration
export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  sorter?: boolean;
  filterable?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

// Action types for assessments
export const ASSESSMENT_ACTIONS = {
  MONITOR_EXAMINEES: 'monitor_examinees',
  SYNC_SUBMISSIONS: 'sync_submissions',
  VIEW_DETAILS: 'view_details',
  EDIT_ASSESSMENT: 'edit_assessment',
  DOWNLOAD_REPORTS: 'download_reports',
  EXPORT_DATA: 'export_data'
} as const;

export type AssessmentActions = typeof ASSESSMENT_ACTIONS[keyof typeof ASSESSMENT_ACTIONS];

// API response types
export interface AssessmentListResponse {
  assessments: AssessmentWithDetails[];
  total: number;
  page: number;
  pageSize: number;
  filters: AssessmentFilters;
}

// Hook return types
export interface UseAssessmentsReturn {
  assessments: AssessmentWithDetails[];
  loading: boolean;
  error: string | null;
  filters: AssessmentFilters;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  setFilters: (filters: Partial<AssessmentFilters>) => void;
  clearFilters: () => void;
  refetch: () => void;
  executeAction: (action: AssessmentActions, assessmentId: string) => Promise<void>;
}

// Component prop types
export interface AssessmentTableProps {
  assessments: AssessmentWithDetails[];
  loading?: boolean;
  onAction: (action: AssessmentActions, assessment: AssessmentWithDetails) => void;
  selectedRowKeys?: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
}

export interface AssessmentFiltersProps {
  areas: Area[];
  programs: Program[];
  courses: Course[];
  filters: AssessmentFilters;
  onFiltersChange: (filters: Partial<AssessmentFilters>) => void;
  onClearFilters: () => void;
  loading?: boolean;
}