import type { Assessment } from '../types/data';

export const mockAssessmentsData: Assessment[] = [
  {
    id: 'ASMT001',
    areaName: 'Humanities',
    assessmentName: 'Midterm Exam',
    program: 'Modern Literature',
    course: 'LIT301 - Modern Literature',
    assessmentStartDate: '2024-03-15T10:00:00Z',
    assessmentEndDate: '2024-03-15T12:00:00Z',
    assessmentStatus: 'Completed',
    examineeCount: 48,
    examinees: [
      {
        id: 'EX01',
        username: 'user123',
        fullName: 'Ethan Harper',
        login: true,
        start: true,
        questionsSynced: 20,
        timeElapsed: '00:55:00',
        status: 'Student Submission',
        groupName: 'Group A - Morning',
        platform: 'Windows 10',
        ipAddress: '192.168.1.148',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-03-15T11:00:00Z', activity: 'Student logged in successfully', details: 'Login from IP: 192.168.1.100' },
          { timestamp: '2024-03-15T11:05:00Z', activity: 'Exam started', details: 'All questions loaded successfully' },
          { timestamp: '2024-03-15T11:30:00Z', activity: 'Answered question 10', details: 'Progress saved automatically' },
          { timestamp: '2024-03-15T11:45:00Z', activity: 'Answered question 15', details: 'Progress saved automatically' },
        ]
      },
      {
        id: 'EX02',
        username: 'user456',
        fullName: 'Olivia Bennett',
        login: true,
        start: true,
        questionsSynced: 20,
        timeElapsed: '00:55:00',
        status: 'Student Submission',
        groupName: 'Group A - Morning',
        platform: 'macOS',
        ipAddress: '192.168.1.12',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-03-15T10:05:00Z', activity: 'Student logged in successfully', details: 'Session started successfully.' },
        ]
      },
      {
        id: 'EX03',
        username: 'user789',
        fullName: 'Marcus Wilson',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Absent',
        groupName: 'Group A - Morning',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'EX04',
        username: 'user101',
        fullName: 'Sarah Johnson',
        login: true,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Group A - Morning',
        platform: 'Windows 11',
        ipAddress: '192.168.1.25',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-03-15T10:30:00Z', activity: 'Student logged in successfully', details: 'Waiting to start exam' },
        ]
      },
      {
        id: 'EX05',
        username: 'user222',
        fullName: 'James Rodriguez',
        login: true,
        start: true,
        questionsSynced: 12,
        timeElapsed: '00:35:00',
        status: 'In Progress',
        groupName: 'Group A - Morning',
        platform: 'macOS',
        ipAddress: '192.168.1.45',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-03-15T10:15:00Z', activity: 'Student logged in successfully', details: 'Login successful' },
          { timestamp: '2024-03-15T10:20:00Z', activity: 'Exam started', details: 'Questions loading...' },
        ]
      },
      {
        id: 'EX06',
        username: 'user333',
        fullName: 'Emma Thompson',
        login: true,
        start: true,
        questionsSynced: 8,
        timeElapsed: '00:25:00',
        status: 'Auto Locked',
        groupName: 'Group A - Morning',
        platform: 'Windows 10',
        ipAddress: '192.168.1.67',
        sessionHealth: 'Unstable Connection',
        activityTimeline: [
          { timestamp: '2024-03-15T10:10:00Z', activity: 'Student logged in successfully', details: 'Session started' },
          { timestamp: '2024-03-15T10:35:00Z', activity: 'Session auto-locked', details: 'Multiple tab switching detected' },
        ]
      }
    ]
  },
  {
    id: 'ASMT002',
    areaName: 'Sciences',
    assessmentName: 'Final Exam',
    program: 'Molecular Biology',
    course: 'BIO401 - Molecular Biology',
    assessmentStartDate: '2024-05-20T15:00:00Z',
    assessmentEndDate: '2024-05-20T17:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 19,
    examinees: [
      {
        id: 'EX03',
        username: 'user789',
        fullName: 'Noah Carter',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Absent',
        groupName: 'Group B',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'EX04',
        username: 'user101',
        fullName: 'Ava Davis',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Group B',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  {
    id: 'ASMT003',
    areaName: 'Arts',
    assessmentName: 'Project Presentation',
    program: 'Studio Art',
    course: 'FA201 - Studio Art',
    assessmentStartDate: '2024-04-10T12:00:00Z',
    assessmentEndDate: '2024-04-10T14:00:00Z',
    assessmentStatus: 'In Progress',
    examineeCount: 92,
    examinees: [
      {
        id: 'EX05',
        username: 'user112',
        fullName: 'Liam Foster',
        login: true,
        start: true,
        questionsSynced: 15,
        timeElapsed: '01:20:00',
        status: 'Pending',
        groupName: 'Group C',
        platform: 'Chrome OS',
        ipAddress: '192.168.1.25',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-04-10T12:01:00Z', activity: 'Student logged in successfully', details: 'Session started successfully.' },
        ]
      }
    ]
  },
  {
    id: 'ASMT004',
    areaName: 'Business',
    assessmentName: 'Case Study Analysis',
    program: 'Strategic Management',
    course: 'BA401 - Strategic Management',
    assessmentStartDate: '2024-06-05T16:00:00Z',
    assessmentEndDate: '2024-06-05T18:00:00Z',
    assessmentStatus: 'Completed',
    examineeCount: 75,
    examinees: []
  },
  {
    id: 'ASMT005',
    areaName: 'Engineering',
    assessmentName: 'Design Review',
    program: 'Software Engineering',
    course: 'CS401 - Software Engineering',
    assessmentStartDate: '2024-07-12T13:00:00Z',
    assessmentEndDate: '2024-07-12T15:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 0,
    examinees: []
  }
]; 