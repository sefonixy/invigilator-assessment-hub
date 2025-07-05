import type { Assessment } from '../types/data';

export const mockAssessmentsData: Assessment[] = [
  // Edge Case 1: Large exam with all possible examinee statuses
  {
    id: 'ASMT001',
    areaName: 'Computer Science',
    assessmentName: 'Data Structures & Algorithms Final Exam',
    program: 'Computer Science',
    course: 'CS301 - Data Structures & Algorithms',
    assessmentStartDate: '2024-03-15T10:00:00Z',
    assessmentEndDate: '2024-03-15T12:00:00Z',
    assessmentStatus: 'In Progress',
    examineeCount: 156,
    examinees: [
      {
        id: 'EX001',
        username: 'johndoe2024',
        fullName: 'John Michael Doe',
        login: true,
        start: true,
        questionsSynced: 25,
        timeElapsed: '01:45:30',
        status: 'Student Submission',
        groupName: 'Main Campus - Building A - Floor 3 - Lab 301',
        platform: 'Windows 11 Pro',
        ipAddress: '192.168.1.100',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-03-15T10:00:00Z', activity: 'Student logged in successfully', details: 'Login from IP: 192.168.1.100' },
          { timestamp: '2024-03-15T10:02:00Z', activity: 'Exam started', details: 'All 25 questions loaded successfully' },
          { timestamp: '2024-03-15T10:15:00Z', activity: 'Question 5 answered', details: 'Multiple choice - Option B selected' },
          { timestamp: '2024-03-15T10:30:00Z', activity: 'Question 10 answered', details: 'Programming question - Solution submitted' },
          { timestamp: '2024-03-15T11:00:00Z', activity: 'Question 15 answered', details: 'Essay question - 450 words submitted' },
          { timestamp: '2024-03-15T11:30:00Z', activity: 'Question 20 answered', details: 'Code debugging - Issue resolved' },
          { timestamp: '2024-03-15T11:45:00Z', activity: 'Exam submitted', details: 'All questions completed successfully' }
        ]
      },
      {
        id: 'EX002',
        username: 'maria.garcia.2024',
        fullName: 'María Elena García-Rodríguez',
        login: true,
        start: true,
        questionsSynced: 18,
        timeElapsed: '01:20:15',
        status: 'In Progress',
        groupName: 'Main Campus - Building A - Floor 3 - Lab 301',
        platform: 'macOS Sonoma 14.2',
        ipAddress: '192.168.1.101',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-03-15T10:05:00Z', activity: 'Student logged in successfully', details: 'Login successful after 2 attempts' },
          { timestamp: '2024-03-15T10:07:00Z', activity: 'Exam started', details: 'Loading questions...' },
          { timestamp: '2024-03-15T10:25:00Z', activity: 'Question 8 answered', details: 'Short answer - Response saved' },
          { timestamp: '2024-03-15T11:00:00Z', activity: 'Session warning', details: 'Detected tab switching - Warning issued' },
          { timestamp: '2024-03-15T11:15:00Z', activity: 'Question 15 answered', details: 'True/False - Answer recorded' }
        ]
      },
      {
        id: 'EX003',
        username: 'student_inactive',
        fullName: 'Alexander William Thompson-Smith III',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Absent',
        groupName: 'Main Campus - Building A - Floor 3 - Lab 301',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'EX004',
        username: 'locked_user',
        fullName: 'Jennifer Rose O\'Connor',
        login: true,
        start: true,
        questionsSynced: 12,
        timeElapsed: '00:45:00',
        status: 'Auto Locked',
        groupName: 'Main Campus - Building B - Floor 2 - Lab 201',
        platform: 'Ubuntu 22.04 LTS',
        ipAddress: '192.168.1.102',
        sessionHealth: 'Unstable Connection',
        activityTimeline: [
          { timestamp: '2024-03-15T10:00:00Z', activity: 'Student logged in successfully', details: 'Session started' },
          { timestamp: '2024-03-15T10:15:00Z', activity: 'Question 3 answered', details: 'Multiple choice selected' },
          { timestamp: '2024-03-15T10:30:00Z', activity: 'Suspicious activity detected', details: 'Multiple tab switching detected' },
          { timestamp: '2024-03-15T10:45:00Z', activity: 'Session auto-locked', details: 'Exceeded maximum violations - Session locked automatically' }
        ]
      },
      {
        id: 'EX005',
        username: 'paper_moved',
        fullName: 'Chen Wei-Ming',
        login: true,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Moved to Paper',
        groupName: 'North Campus - Building C - Floor 1 - Lab 105',
        platform: 'Chrome OS',
        ipAddress: '192.168.2.50',
        sessionHealth: 'N/A',
        activityTimeline: [
          { timestamp: '2024-03-15T09:45:00Z', activity: 'Student logged in successfully', details: 'Pre-exam login successful' },
          { timestamp: '2024-03-15T09:58:00Z', activity: 'Technical issue reported', details: 'Network connectivity problems' },
          { timestamp: '2024-03-15T10:05:00Z', activity: 'Moved to paper format', details: 'Invigilator decision due to technical difficulties' }
        ]
      },
      {
        id: 'EX006',
        username: 'not_started_user',
        fullName: 'Sarah Elizabeth Johnson',
        login: true,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'North Campus - Building C - Floor 1 - Lab 105',
        platform: 'Windows 10 Education',
        ipAddress: '192.168.2.51',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-03-15T09:55:00Z', activity: 'Student logged in successfully', details: 'Waiting for exam to begin' },
          { timestamp: '2024-03-15T10:00:00Z', activity: 'Exam available', details: 'Student can start exam now' }
        ]
      }
    ]
  },
  
  // Edge Case 2: Small scheduled exam
  {
    id: 'ASMT002',
    areaName: 'Mathematics',
    assessmentName: 'Advanced Calculus III - Partial Derivatives & Multiple Integrals',
    program: 'Applied Mathematics',
    course: 'MATH451 - Advanced Calculus III',
    assessmentStartDate: '2024-04-22T14:00:00Z',
    assessmentEndDate: '2024-04-22T16:30:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 23,
    examinees: [
      {
        id: 'EX007',
        username: 'mathstudent1',
        fullName: 'Ahmed Hassan Al-Rashid',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Science Building - Floor 4 - Room 401',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'EX008',
        username: 'calc_expert',
        fullName: 'Priya Sharma',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Science Building - Floor 4 - Room 401',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  
  // Edge Case 3: Zero examinees (cancelled/no enrollment)
  {
    id: 'ASMT003',
    areaName: 'Fine Arts',
    assessmentName: 'Art History Survey',
    program: 'Art History',
    course: 'ART101 - Introduction to Art History',
    assessmentStartDate: '2024-05-10T09:00:00Z',
    assessmentEndDate: '2024-05-10T11:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 0,
    examinees: []
  },
  
  // Edge Case 4: Completed exam with mixed results
  {
    id: 'ASMT004',
    areaName: 'Engineering',
    assessmentName: 'Software Engineering Principles & Design Patterns',
    program: 'Software Engineering',
    course: 'SE401 - Software Engineering Principles',
    assessmentStartDate: '2024-02-15T13:00:00Z',
    assessmentEndDate: '2024-02-15T15:30:00Z',
    assessmentStatus: 'Completed',
    examineeCount: 89,
    examinees: [
      {
        id: 'EX009',
        username: 'dev_master',
        fullName: 'Robert James Anderson',
        login: true,
        start: true,
        questionsSynced: 30,
        timeElapsed: '02:28:45',
        status: 'Student Submission',
        groupName: 'Engineering Building - Floor 2 - Lab 205',
        platform: 'Windows 11 Pro',
        ipAddress: '192.168.3.100',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-02-15T13:00:00Z', activity: 'Student logged in successfully', details: 'Session started on time' },
          { timestamp: '2024-02-15T13:05:00Z', activity: 'Exam started', details: 'All 30 questions loaded' },
          { timestamp: '2024-02-15T15:28:00Z', activity: 'Exam submitted', details: 'Completed with 2 minutes remaining' }
        ]
      },
      {
        id: 'EX010',
        username: 'late_starter',
        fullName: 'Emily Catherine Davis',
        login: true,
        start: true,
        questionsSynced: 22,
        timeElapsed: '01:45:20',
        status: 'Student Submission',
        groupName: 'Engineering Building - Floor 2 - Lab 205',
        platform: 'macOS Monterey',
        ipAddress: '192.168.3.101',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-02-15T13:15:00Z', activity: 'Student logged in successfully', details: 'Late start - 15 minutes after scheduled time' },
          { timestamp: '2024-02-15T13:18:00Z', activity: 'Exam started', details: 'Started with reduced time' },
          { timestamp: '2024-02-15T15:03:00Z', activity: 'Exam submitted', details: 'Submitted early due to time constraints' }
        ]
      }
    ]
  },
  
  // Edge Case 5: Very long course name and special characters
  {
    id: 'ASMT005',
    areaName: 'Business Administration',
    assessmentName: 'International Business Strategy & Cross-Cultural Management in Global Markets',
    program: 'Master of Business Administration (MBA)',
    course: 'MBA650 - International Business Strategy & Cross-Cultural Management',
    assessmentStartDate: '2024-06-05T10:00:00Z',
    assessmentEndDate: '2024-06-05T13:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 45,
    examinees: [
      {
        id: 'EX011',
        username: 'mba_student_2024',
        fullName: 'François Jean-Baptiste Dubois',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Business School - Executive Floor - Room 801',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  
  // Edge Case 6: Multiple campuses and buildings
  {
    id: 'ASMT006',
    areaName: 'Natural Sciences',
    assessmentName: 'Organic Chemistry Lab Practical',
    program: 'Chemistry',
    course: 'CHEM351 - Organic Chemistry Laboratory',
    assessmentStartDate: '2024-04-18T08:00:00Z',
    assessmentEndDate: '2024-04-18T12:00:00Z',
    assessmentStatus: 'In Progress',
    examineeCount: 67,
    examinees: [
      {
        id: 'EX012',
        username: 'chem_lab_01',
        fullName: 'Yuki Tanaka',
        login: true,
        start: true,
        questionsSynced: 15,
        timeElapsed: '02:15:30',
        status: 'In Progress',
        groupName: 'West Campus - Science Complex - Floor 3 - Lab 315',
        platform: 'iPad Pro',
        ipAddress: '192.168.4.200',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-04-18T08:00:00Z', activity: 'Student logged in successfully', details: 'Mobile device login' },
          { timestamp: '2024-04-18T08:05:00Z', activity: 'Exam started', details: 'Lab practical questions loaded' },
          { timestamp: '2024-04-18T09:30:00Z', activity: 'Lab procedure 1 completed', details: 'Synthesis reaction documented' },
          { timestamp: '2024-04-18T10:15:00Z', activity: 'Lab procedure 2 completed', details: 'Purification steps recorded' }
        ]
      },
      {
        id: 'EX013',
        username: 'chemistry_ace',
        fullName: 'Dmitri Volkov',
        login: true,
        start: true,
        questionsSynced: 10,
        timeElapsed: '01:30:45',
        status: 'Auto Locked',
        groupName: 'West Campus - Science Complex - Floor 3 - Lab 315',
        platform: 'Surface Pro 9',
        ipAddress: '192.168.4.201',
        sessionHealth: 'Poor Connection',
        activityTimeline: [
          { timestamp: '2024-04-18T08:00:00Z', activity: 'Student logged in successfully', details: 'Touch screen device detected' },
          { timestamp: '2024-04-18T08:10:00Z', activity: 'Exam started', details: 'Lab questions loaded' },
          { timestamp: '2024-04-18T09:00:00Z', activity: 'Connection issues detected', details: 'Intermittent network problems' },
          { timestamp: '2024-04-18T09:30:00Z', activity: 'Session auto-locked', details: 'Multiple connection timeouts exceeded limit' }
        ]
      }
    ]
  },
  
  // Edge Case 7: Different time zones and dates
  {
    id: 'ASMT007',
    areaName: 'Social Sciences',
    assessmentName: 'Psychology Research Methods',
    program: 'Psychology',
    course: 'PSY301 - Research Methods in Psychology',
    assessmentStartDate: '2024-07-30T19:00:00Z',
    assessmentEndDate: '2024-07-30T21:30:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 112,
    examinees: [
      {
        id: 'EX014',
        username: 'psych_research_01',
        fullName: 'Isabella Martinez Rodriguez',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Social Sciences Building - Floor 1 - Room 101',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  
  // Edge Case 8: Single examinee scenario
  {
    id: 'ASMT008',
    areaName: 'Literature',
    assessmentName: 'Independent Study Evaluation',
    program: 'English Literature',
    course: 'ENG499 - Independent Study',
    assessmentStartDate: '2024-05-25T14:00:00Z',
    assessmentEndDate: '2024-05-25T16:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 1,
    examinees: [
      {
        id: 'EX015',
        username: 'solo_scholar',
        fullName: 'Theodore Benjamin Whitmore',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Library - Study Room 204',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  
  // Edge Case 9: Maximum edge case - very large number
  {
    id: 'ASMT009',
    areaName: 'General Education',
    assessmentName: 'University-Wide Competency Assessment',
    program: 'General Education',
    course: 'GEN100 - University Competency Assessment',
    assessmentStartDate: '2024-08-15T09:00:00Z',
    assessmentEndDate: '2024-08-15T12:00:00Z',
    assessmentStatus: 'Scheduled',
    examineeCount: 1247,
    examinees: [
      {
        id: 'EX016',
        username: 'gen_ed_student',
        fullName: 'Multiple Students Enrolled',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Not Started',
        groupName: 'Multiple Locations - Campus Wide',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  
  // Edge Case 10: Past completed exam with all submission types
  {
    id: 'ASMT010',
    areaName: 'Computer Science',
    assessmentName: 'Database Systems & SQL',
    program: 'Computer Science',
    course: 'CS205 - Database Systems',
    assessmentStartDate: '2024-01-20T11:00:00Z',
    assessmentEndDate: '2024-01-20T13:00:00Z',
    assessmentStatus: 'Completed',
    examineeCount: 78,
    examinees: [
      {
        id: 'EX017',
        username: 'db_expert',
        fullName: 'Michael Zhang',
        login: true,
        start: true,
        questionsSynced: 20,
        timeElapsed: '01:55:30',
        status: 'Student Submission',
        groupName: 'Computer Lab - Building D - Floor 1 - Lab 101',
        platform: 'Linux Ubuntu 20.04',
        ipAddress: '192.168.5.100',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-01-20T11:00:00Z', activity: 'Student logged in successfully', details: 'Linux workstation login' },
          { timestamp: '2024-01-20T11:05:00Z', activity: 'Exam started', details: 'Database questions loaded' },
          { timestamp: '2024-01-20T12:55:00Z', activity: 'Exam submitted', details: 'All SQL queries completed successfully' }
        ]
      },
      {
        id: 'EX018',
        username: 'absent_student',
        fullName: 'No Show Student',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: 'N/A',
        status: 'Absent',
        groupName: 'Computer Lab - Building D - Floor 1 - Lab 101',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  }
];

// Mock data for tree select groups (hierarchical structure)
export const mockGroupsData = [
  {
    title: 'Main Campus',
    value: 'main-campus',
    children: [
      {
        title: 'Building A',
        value: 'main-building-a',
        children: [
          {
            title: 'Floor 3',
            value: 'main-a-floor-3',
            children: [
              { title: 'Lab 301', value: 'main-a-3-lab-301' },
              { title: 'Lab 302', value: 'main-a-3-lab-302' },
              { title: 'Lab 303', value: 'main-a-3-lab-303' }
            ]
          }
        ]
      },
      {
        title: 'Building B',
        value: 'main-building-b',
        children: [
          {
            title: 'Floor 2',
            value: 'main-b-floor-2',
            children: [
              { title: 'Lab 201', value: 'main-b-2-lab-201' },
              { title: 'Lab 202', value: 'main-b-2-lab-202' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'North Campus',
    value: 'north-campus',
    children: [
      {
        title: 'Building C',
        value: 'north-building-c',
        children: [
          {
            title: 'Floor 1',
            value: 'north-c-floor-1',
            children: [
              { title: 'Lab 105', value: 'north-c-1-lab-105' },
              { title: 'Lab 106', value: 'north-c-1-lab-106' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'West Campus',
    value: 'west-campus',
    children: [
      {
        title: 'Science Complex',
        value: 'west-science-complex',
        children: [
          {
            title: 'Floor 3',
            value: 'west-science-floor-3',
            children: [
              { title: 'Lab 315', value: 'west-science-3-lab-315' },
              { title: 'Lab 316', value: 'west-science-3-lab-316' }
            ]
          }
        ]
      }
    ]
  }
];

// Export default for backward compatibility
export default mockAssessmentsData; 