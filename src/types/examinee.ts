export type SubmissionStatus = 
  | 'Present' 
  | 'Student Submission' 
  | 'Pending' 
  | 'Auto Locked' 
  | 'Absent' 
  | 'Moved to Paper';

export type SessionHealth = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';

export type ExamSessionStatus = 'All' | 'Active' | 'Completed' | 'Pending' | 'Issues';

// Represents a single row in the main submissions table
export interface ExamineeSubmission {
  id: string;
  username: string;
  fullName: string;
  login: boolean; // Whether student has logged in
  start: boolean; // Whether student has started the exam
  questionsSynced: number; // Number of questions synced (format: completed/total)
  totalQuestions: number;
  timeElapsed: string; // Time elapsed in HH:MM:SS format
  status: SubmissionStatus;
  areaId: string;
  groupId: string;
  loginTime?: string; // ISO string
  startTime?: string; // ISO string
}

// Represents the detailed data for the popup modal
export interface ExamineeDetails extends ExamineeSubmission {
  areaName: string;
  groupName: string;
  platform: string; // e.g., "Windows 10", "macOS", "Android"
  ipAddress: string;
  sessionHealth: SessionHealth;
  browserInfo: string;
  lastActivity: string; // ISO string
  totalTimeAllowed: number; // in minutes
  remainingTime: number; // in minutes
  logs: Array<{
    id: string;
    timestamp: string; // ISO string
    activity: string;
    type: 'login' | 'logout' | 'start' | 'submit' | 'warning' | 'error';
    details?: string;
  }>;
}

// Filter interfaces
export interface SubmissionFilters {
  areaId?: string;
  groupIds?: string[]; // Multiple groups can be selected
  examineeSearch?: string;
  examSessionStatus?: ExamSessionStatus;
}

// Group structure for tree select
export interface ExamineeGroup {
  id: string;
  name: string;
  areaId: string;
  children?: ExamineeGroup[];
  examineesCount: number;
}

// Area structure
export interface ExamineeArea {
  id: string;
  name: string;
  groupsCount: number;
  examineesCount: number;
}

// Action options based on status
export interface StatusActionOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

// Component prop types
export interface SubmissionsFilterProps {
  areas: ExamineeArea[];
  groups: ExamineeGroup[];
  examinees: ExamineeSubmission[];
  filters: SubmissionFilters;
  onFiltersChange: (filters: Partial<SubmissionFilters>) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export interface SubmissionsTableProps {
  submissions: ExamineeSubmission[];
  loading?: boolean;
  onExamineeClick: (examinee: ExamineeSubmission) => void;
  onStatusAction: (action: string, examinee: ExamineeSubmission) => void;
  selectedRowKeys?: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
}

export interface ExamineeDetailsModalProps {
  visible: boolean;
  examinee: ExamineeDetails | null;
  onClose: () => void;
  loading?: boolean;
}

// API response types
export interface SubmissionsResponse {
  submissions: ExamineeSubmission[];
  total: number;
  examInfo: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    totalQuestions: number;
  };
  summary: {
    totalExaminees: number;
    present: number;
    absent: number;
    completed: number;
    inProgress: number;
  };
}

// Hook return types
export interface UseSubmissionsReturn {
  submissions: ExamineeSubmission[];
  areas: ExamineeArea[];
  groups: ExamineeGroup[];
  loading: boolean;
  error: string | null;
  filters: SubmissionFilters;
  examInfo: SubmissionsResponse['examInfo'] | null;
  summary: SubmissionsResponse['summary'] | null;
  setFilters: (filters: Partial<SubmissionFilters>) => void;
  clearFilters: () => void;
  refetch: () => void;
  getExamineeDetails: (examineeId: string) => Promise<ExamineeDetails>;
  executeStatusAction: (action: string, examineeId: string) => Promise<void>;
} 