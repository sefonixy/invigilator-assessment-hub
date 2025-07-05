import type { Assessment } from '../types/data';

export const mockAssessmentsData: Assessment[] = [
  {
    id: 'ASMT001',
    areaName: '(Central)',
    assessmentName: 'General Science Exam - Nov ACU',
    program: 'Mixed Subjects',
    course: 'Grade 6',
    assessmentStartDate: '2024-11-19T13:45:00Z',
    assessmentEndDate: '2025-11-20T12:00:00Z',
    assessmentStatus: 'Not Started',
    examinees: [
      // This array covers all student statuses for one assessment
      {
        id: 'SA-010',
        username: 'student.one',
        fullName: 'abd el rahman farag',
        login: true,
        start: true,
        questionsSynced: 13,
        timeElapsed: '41 secs',
        status: 'Student Submission', // Edge Case: Allows "Reset Session Timer" or "Restart Session"
        groupName: '9A',
        platform: 'Android',
        ipAddress: '192.168.1.10',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-11-19T13:46:00Z', activity: 'Login', details: 'Session started.' }
        ]
      },
      {
        id: 'SA-011',
        username: 'student.two',
        fullName: 'Ahmed Fawzy Elfeky',
        login: true,
        start: true,
        questionsSynced: 13,
        timeElapsed: '1 min, 31 secs',
        status: 'Pending', // Edge Case: A submission that is waiting for final processing
        groupName: '9A',
        platform: 'Windows',
        ipAddress: '192.168.1.12',
        sessionHealth: 'Average normal session',
        activityTimeline: [
          { timestamp: '2024-11-19T13:45:30Z', activity: 'Login', details: 'Session started.' }
        ]
      },
      {
        id: 'SA-012',
        username: 'student.three',
        fullName: 'Amr Ahmed Fathy',
        login: true,
        start: true,
        questionsSynced: 13,
        timeElapsed: '43 secs',
        status: 'Auto Locked', // Edge Case: Allows "Unlock Session"
        groupName: '9B',
        platform: 'Android',
        ipAddress: '192.168.1.15',
        sessionHealth: 'Needs Attention',
        activityTimeline: [
          { timestamp: '2024-11-19T13:47:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2024-11-19T13:47:43Z', activity: 'Warning', details: 'Session auto-locked due to inactivity.' }
        ]
      },
      {
        id: 'SA-013',
        username: 'student.four',
        fullName: 'abdallah goda ali',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Absent', // Edge Case: Allows "Switch to Paper"
        groupName: '9B',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'SA-014',
        username: 'student.five',
        fullName: 'Hager Reda Mohamed',
        login: true,
        start: true,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Moved to Paper', // Edge Case: Result of the "Switch to Paper" action
        groupName: '9C',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: [
          { timestamp: '2024-11-19T14:00:00Z', activity: 'Action', details: 'Switched to paper mode by invigilator.' }
        ]
      },
      {
        id: 'SA-015',
        username: 'student.six',
        fullName: 'Hussein Adel-awad',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Not Started', // Edge Case: A student who has not begun the exam
        groupName: '9C',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      // Additional students for comprehensive testing
      {
        id: 'SA-016',
        username: 'student.seven',
        fullName: 'Fatma Hassan Ibrahim',
        login: true,
        start: true,
        questionsSynced: 8,
        timeElapsed: '2 min, 15 secs',
        status: 'Student Submission',
        groupName: '9A',
        platform: 'iOS',
        ipAddress: '192.168.1.20',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-11-19T13:46:30Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2024-11-19T13:48:45Z', activity: 'Submission', details: 'Submitted successfully.' }
        ]
      },
      {
        id: 'SA-017',
        username: 'student.eight',
        fullName: 'Mohamed Ali Hassan',
        login: true,
        start: true,
        questionsSynced: 5,
        timeElapsed: '1 min, 45 secs',
        status: 'Pending',
        groupName: '9B',
        platform: 'Windows',
        ipAddress: '192.168.1.25',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-11-19T13:47:15Z', activity: 'Login', details: 'Session started.' }
        ]
      }
    ]
  },
  {
    id: 'ASMT002',
    areaName: '(Central)',
    assessmentName: 'Random exam- normal -campus',
    program: 'Mixed Subjects',
    course: 'Not Specific',
    assessmentStartDate: '2024-11-26T16:46:00Z',
    assessmentEndDate: '2025-11-27T12:00:00Z',
    assessmentStatus: 'Ongoing', // Edge Case: An ongoing assessment
    examinees: [
      {
        id: 'SA-020',
        username: 'ongoing.student1',
        fullName: 'Nour Mahmoud Ahmed',
        login: true,
        start: true,
        questionsSynced: 25,
        timeElapsed: '15 min, 30 secs',
        status: 'Student Submission',
        groupName: '10A',
        platform: 'Windows',
        ipAddress: '192.168.2.10',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-11-26T16:46:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2024-11-26T17:01:30Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      },
      {
        id: 'SA-021',
        username: 'ongoing.student2',
        fullName: 'Youssef Omar Khaled',
        login: true,
        start: true,
        questionsSynced: 18,
        timeElapsed: '12 min, 45 secs',
        status: 'Pending',
        groupName: '10A',
        platform: 'Android',
        ipAddress: '192.168.2.11',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2024-11-26T16:47:00Z', activity: 'Login', details: 'Session started.' }
        ]
      },
      {
        id: 'SA-022',
        username: 'ongoing.student3',
        fullName: 'Aya Samir Farouk',
        login: true,
        start: true,
        questionsSynced: 10,
        timeElapsed: '8 min, 20 secs',
        status: 'Auto Locked',
        groupName: '10B',
        platform: 'iOS',
        ipAddress: '192.168.2.12',
        sessionHealth: 'Needs Attention',
        activityTimeline: [
          { timestamp: '2024-11-26T16:48:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2024-11-26T16:56:20Z', activity: 'Warning', details: 'Auto-locked due to suspicious activity.' }
        ]
      },
      {
        id: 'SA-023',
        username: 'ongoing.student4',
        fullName: 'Kareem Ashraf Mahmoud',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Absent',
        groupName: '10B',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  {
    id: 'ASMT003',
    areaName: '(Central)',
    assessmentName: 'May 2025 media test for ACU exam',
    program: 'Mixed Subjects',
    course: 'Grade 6',
    assessmentStartDate: '2025-06-01T16:53:00Z',
    assessmentEndDate: '2025-06-02T17:53:00Z',
    assessmentStatus: 'Finished', // Edge Case: A finished assessment
    examinees: [
      {
        id: 'SA-030',
        username: 'finished.student1',
        fullName: 'Layla Adel Mostafa',
        login: true,
        start: true,
        questionsSynced: 20,
        timeElapsed: '45 min, 30 secs',
        status: 'Student Submission',
        groupName: '6A',
        platform: 'Windows',
        ipAddress: '192.168.3.10',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2025-06-01T16:53:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2025-06-01T17:38:30Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      },
      {
        id: 'SA-031',
        username: 'finished.student2',
        fullName: 'Omar Hesham Nabil',
        login: true,
        start: true,
        questionsSynced: 15,
        timeElapsed: '38 min, 15 secs',
        status: 'Student Submission',
        groupName: '6A',
        platform: 'Android',
        ipAddress: '192.168.3.11',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2025-06-01T16:54:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2025-06-01T17:32:15Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      },
      {
        id: 'SA-032',
        username: 'finished.student3',
        fullName: 'Menna Allah Tarek',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Absent',
        groupName: '6B',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      }
    ]
  },
  {
    id: 'ASMT004',
    areaName: '(North)',
    assessmentName: 'English Literature Final',
    program: 'Advance English',
    course: 'Grade 8',
    assessmentStartDate: '2025-05-20T09:00:00Z',
    assessmentEndDate: '2025-05-20T11:00:00Z',
    assessmentStatus: 'Closed', // Edge Case: A closed assessment
    examinees: [
      {
        id: 'SA-040',
        username: 'closed.student1',
        fullName: 'Salma Yasser Abdel Rahman',
        login: true,
        start: true,
        questionsSynced: 30,
        timeElapsed: '1 hr, 45 min',
        status: 'Student Submission',
        groupName: '8A',
        platform: 'Windows',
        ipAddress: '192.168.4.10',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2025-05-20T09:00:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2025-05-20T10:45:00Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      },
      {
        id: 'SA-041',
        username: 'closed.student2',
        fullName: 'Mahmoud Tamer Soliman',
        login: true,
        start: true,
        questionsSynced: 28,
        timeElapsed: '1 hr, 52 min',
        status: 'Student Submission',
        groupName: '8A',
        platform: 'macOS',
        ipAddress: '192.168.4.11',
        sessionHealth: 'Good',
        activityTimeline: [
          { timestamp: '2025-05-20T09:02:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2025-05-20T10:54:00Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      }
    ]
  },
  // Additional assessments for comprehensive testing
  {
    id: 'ASMT005',
    areaName: '(South)',
    assessmentName: 'Mathematics Advanced Placement',
    program: 'Advanced Mathematics',
    course: 'Grade 12',
    assessmentStartDate: '2024-12-15T10:00:00Z',
    assessmentEndDate: '2024-12-15T13:00:00Z',
    assessmentStatus: 'Ongoing',
    examinees: [
      {
        id: 'SA-050',
        username: 'math.advanced1',
        fullName: 'Yasmin Ahmed Hosny',
        login: true,
        start: true,
        questionsSynced: 22,
        timeElapsed: '2 hr, 15 min',
        status: 'Student Submission',
        groupName: '12A',
        platform: 'Windows',
        ipAddress: '192.168.5.10',
        sessionHealth: 'Excellent',
        activityTimeline: [
          { timestamp: '2024-12-15T10:00:00Z', activity: 'Login', details: 'Session started.' },
          { timestamp: '2024-12-15T12:15:00Z', activity: 'Submission', details: 'Exam completed successfully.' }
        ]
      }
    ]
  },
  {
    id: 'ASMT006',
    areaName: '(East)',
    assessmentName: 'Physics Lab Practical Exam',
    program: 'Natural Sciences',
    course: 'Grade 11',
    assessmentStartDate: '2024-11-30T14:00:00Z',
    assessmentEndDate: '2024-11-30T17:00:00Z',
    assessmentStatus: 'Not Started',
    examinees: [
      {
        id: 'SA-060',
        username: 'physics.lab1',
        fullName: 'Marwan Essam Fahmy',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Not Started',
        groupName: '11A',
        platform: 'N/A',
        ipAddress: 'N/A',
        sessionHealth: 'N/A',
        activityTimeline: []
      },
      {
        id: 'SA-061',
        username: 'physics.lab2',
        fullName: 'Rania Khaled Zaki',
        login: false,
        start: false,
        questionsSynced: 0,
        timeElapsed: '-',
        status: 'Not Started',
        groupName: '11A',
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
    title: 'Central Campus',
    value: 'central-campus',
    children: [
      {
        title: 'Main Building',
        value: 'central-main-building',
        children: [
          {
            title: 'Floor 1',
            value: 'central-main-floor-1',
            children: [
              { title: '9A', value: '9A' },
              { title: '9B', value: '9B' },
              { title: '9C', value: '9C' }
            ]
          },
          {
            title: 'Floor 2',
            value: 'central-main-floor-2',
            children: [
              { title: '10A', value: '10A' },
              { title: '10B', value: '10B' }
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
        title: 'Academic Building',
        value: 'north-academic-building',
        children: [
          {
            title: 'Floor 3',
            value: 'north-academic-floor-3',
            children: [
              { title: '8A', value: '8A' },
              { title: '8B', value: '8B' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'South Campus',
    value: 'south-campus',
    children: [
      {
        title: 'Science Building',
        value: 'south-science-building',
        children: [
          {
            title: 'Floor 4',
            value: 'south-science-floor-4',
            children: [
              { title: '12A', value: '12A' },
              { title: '11A', value: '11A' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'East Campus',
    value: 'east-campus',
    children: [
      {
        title: 'Lab Complex',
        value: 'east-lab-complex',
        children: [
          {
            title: 'Floor 2',
            value: 'east-lab-floor-2',
            children: [
              { title: '6A', value: '6A' },
              { title: '6B', value: '6B' }
            ]
          }
        ]
      }
    ]
  }
];

// Export default for backward compatibility
export default mockAssessmentsData; 