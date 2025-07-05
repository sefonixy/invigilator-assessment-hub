// src/types/data.ts

// Type for the status of an assessment
export type AssessmentStatus = 'Completed' | 'Scheduled' | 'In Progress';

// Type for the status of an examinee's session
export type ExamineeStatus = 'Student Submission' | 'Pending' | 'Auto Locked' | 'Absent' | 'Moved to Paper' | 'Not Started' | 'In Progress';

// Type for a single log entry in the examinee's activity timeline
export interface LogEntry {
  timestamp: string;
  activity: string;
  details: string;
}

// Represents a single examinee, containing ALL data for both the table and the modal view
export interface Examinee {
  // Core identification
  id: string;
  username: string;
  fullName: string;
  
  // Data for the "Track Submissions" table view
  login: boolean;
  start: boolean;
  questionsSynced: number;
  timeElapsed: string;
  status: ExamineeStatus;

  // Detailed data for the modal popup view
  groupName: string;
  platform: string;
  ipAddress: string;
  sessionHealth: string;
  activityTimeline: LogEntry[];
}

// Represents the top-level Assessment object, our single source of truth
export interface Assessment {
  id: string;
  areaName: string;
  assessmentName: string;
  program: string;
  course: string;
  assessmentStartDate: string;
  assessmentEndDate: string;
  assessmentStatus: AssessmentStatus;
  
  // Contains the list of all examinees for this assessment
  examinees: Examinee[];
} 