// Assessment statuses from the exam filter
export type AssessmentStatus = 'Ongoing' | 'Not Started' | 'Finished' | 'Closed';

// Student session statuses
export type ExamineeStatus = 'Student Submission' | 'Pending' | 'Auto Locked' | 'Absent' | 'Moved to Paper' | 'Not Started';

// Activity log entry for the student details modal
export interface LogEntry {
  timestamp: string;
  activity: 'Login' | 'Logout' | 'Submission' | 'Warning' | 'Action';
  details: string;
}

// Student data - contains everything for both table and modal views
export interface Examinee {
  // Basic info
  id: string; // "SA-010"
  username: string;
  fullName: string;
  
  // Table data
  login: boolean;
  start: boolean;
  questionsSynced: number;
  timeElapsed: string;
  status: ExamineeStatus;

  // Modal details
  groupName: string; // "9A"
  platform: string; // "Android"
  ipAddress: string; // "192.168.1.1"
  sessionHealth: string; // "Good", "Needs Attention"
  activityTimeline: LogEntry[];
}

// Main assessment object with all student data
export interface Assessment {
  id: string;
  areaName: string; // "(Central)"
  assessmentName: string; // "General Science Exam - Nov ACU"
  program: string; // "Mixed Subjects"
  course: string; // "Grade 6"
  assessmentStartDate: string;
  assessmentEndDate: string;
  assessmentStatus: AssessmentStatus;
  
  // All students for this exam
  examinees: Examinee[];
} 