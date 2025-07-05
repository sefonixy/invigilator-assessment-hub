// src/types/data.ts

/**
 * Defines the possible statuses for an assessment.
 * As seen in the "Exam Status" filter in the video.
 */
export type AssessmentStatus = 'Ongoing' | 'Not Started' | 'Finished' | 'Closed';

/**
 * Defines the possible statuses for an examinee's session.
 * As seen in the "Filter by Status" dropdown in the video.
 */
export type ExamineeStatus = 'Student Submission' | 'Pending' | 'Auto Locked' | 'Absent' | 'Moved to Paper' | 'Not Started';

/**
 * Defines a single entry in an examinee's activity log.
 * As seen in the modal popup in the video.
 */
export interface LogEntry {
  timestamp: string;
  activity: 'Login' | 'Logout' | 'Submission' | 'Warning' | 'Action';
  details: string;
}

/**
 * Represents a single examinee, containing ALL data for both the table and the modal view.
 * This ensures a single, consistent object for each student.
 */
export interface Examinee {
  // Core identification
  id: string; // e.g., "SA-010"
  username: string;
  fullName: string;
  
  // Data for the "Track Submissions" table view
  login: boolean;
  start: boolean;
  questionsSynced: number;
  timeElapsed: string;
  status: ExamineeStatus; // The current status of the examinee's session

  // Detailed data for the modal popup view
  groupName: string; // e.g., "9A"
  platform: string; // e.g., "Android"
  ipAddress: string; // e.g., "192.168.1.1"
  sessionHealth: string; // e.g., "Average normal session"
  activityTimeline: LogEntry[];
}

/**
 * Represents the top-level Assessment object, our single source of truth.
 */
export interface Assessment {
  id: string;
  areaName: string; // e.g., "(Central)"
  assessmentName: string; // e.g., "General Science Exam - Nov ACU"
  program: string; // e.g., "Mixed Subjects"
  course: string; // e.g., "Grade 6"
  assessmentStartDate: string;
  assessmentEndDate: string;
  assessmentStatus: AssessmentStatus;
  
  // The nested array of all examinees for this assessment
  examinees: Examinee[];
} 