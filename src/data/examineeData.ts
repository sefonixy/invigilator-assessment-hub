import type {
  ExamineeSubmission,
  ExamineeDetails,
  ExamineeArea,
  ExamineeGroup,
  SubmissionsResponse
} from '../types/examinee';

// Mock Areas for examinees
export const mockExamineeAreas: ExamineeArea[] = [
  {
    id: 'area-1',
    name: 'Science Campus',
    groupsCount: 3,
    examineesCount: 89
  },
  {
    id: 'area-2', 
    name: 'Arts Campus',
    groupsCount: 2,
    examineesCount: 45
  },
  {
    id: 'area-3',
    name: 'Engineering Campus', 
    groupsCount: 4,
    examineesCount: 112
  }
];

// Mock Groups with tree structure
export const mockExamineeGroups: ExamineeGroup[] = [
  {
    id: 'group-1',
    name: 'Group A - Morning',
    areaId: 'area-1',
    examineesCount: 30,
    children: [
      {
        id: 'subgroup-1a',
        name: 'Lab Section 1',
        areaId: 'area-1',
        examineesCount: 15
      },
      {
        id: 'subgroup-1b', 
        name: 'Lab Section 2',
        areaId: 'area-1',
        examineesCount: 15
      }
    ]
  },
  {
    id: 'group-2',
    name: 'Group B - Afternoon',
    areaId: 'area-1',
    examineesCount: 29,
    children: [
      {
        id: 'subgroup-2a',
        name: 'Theory Section 1',
        areaId: 'area-1', 
        examineesCount: 14
      },
      {
        id: 'subgroup-2b',
        name: 'Theory Section 2',
        areaId: 'area-1',
        examineesCount: 15
      }
    ]
  },
  {
    id: 'group-3',
    name: 'Group C - Evening',
    areaId: 'area-1',
    examineesCount: 30
  },
  {
    id: 'group-4',
    name: 'Arts Group A',
    areaId: 'area-2',
    examineesCount: 25
  },
  {
    id: 'group-5',
    name: 'Arts Group B', 
    areaId: 'area-2',
    examineesCount: 20
  }
];

// Mock Examinee Submissions
export const mockExamineeSubmissions: ExamineeSubmission[] = [
  {
    id: 'exam-1',
    username: 'user123',
    fullName: 'Ethan Harper',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-1',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-2',
    username: 'user456',
    fullName: 'Olivia Bennett',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-1',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-3',
    username: 'user789',
    fullName: 'Noah Carter',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-1',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-4',
    username: 'user101',
    fullName: 'Ava Davis',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-2',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-5',
    username: 'user112',
    fullName: 'Liam Foster',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-2',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-6',
    username: 'user131',
    fullName: 'Isabella Green',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-2',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-7',
    username: 'user145',
    fullName: 'Lucas Hayes',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-3',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-8',
    username: 'user156',
    fullName: 'Mia Jenkins',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-3',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-9',
    username: 'user167',
    fullName: 'Owen King',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-3',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-10',
    username: 'user178',
    fullName: 'Sophia Lane',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '00:55:00',
    status: 'Present',
    areaId: 'area-1',
    groupId: 'group-3',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  },
  {
    id: 'exam-11',
    username: 'user200',
    fullName: 'James Wilson',
    login: false,
    start: false,
    questionsSynced: 0,
    totalQuestions: 20,
    timeElapsed: '00:00:00',
    status: 'Absent',
    areaId: 'area-2',
    groupId: 'group-4'
  },
  {
    id: 'exam-12',
    username: 'user201',
    fullName: 'Emma Thompson',
    login: true,
    start: false,
    questionsSynced: 0,
    totalQuestions: 20,
    timeElapsed: '00:00:00',
    status: 'Pending',
    areaId: 'area-2',
    groupId: 'group-4',
    loginTime: '2024-12-26T10:00:00Z'
  },
  {
    id: 'exam-13',
    username: 'user202',
    fullName: 'William Brown',
    login: true,
    start: true,
    questionsSynced: 20,
    totalQuestions: 20,
    timeElapsed: '01:30:00',
    status: 'Student Submission',
    areaId: 'area-2',
    groupId: 'group-5',
    loginTime: '2024-12-26T10:00:00Z',
    startTime: '2024-12-26T10:05:00Z'
  }
];

// Helper function to get examinee details
export const getExamineeDetails = (examineeId: string): ExamineeDetails => {
  const submission = mockExamineeSubmissions.find(e => e.id === examineeId);
  if (!submission) {
    throw new Error('Examinee not found');
  }

  const area = mockExamineeAreas.find(a => a.id === submission.areaId);
  const group = mockExamineeGroups.find(g => g.id === submission.groupId);

  return {
    ...submission,
    areaName: area?.name || 'Unknown Area',
    groupName: group?.name || 'Unknown Group',
    platform: 'Windows 10',
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
    sessionHealth: submission.status === 'Present' ? 'Excellent' : 
                   submission.status === 'Pending' ? 'Good' : 'Poor',
    browserInfo: 'Chrome 120.0.6099.129',
    lastActivity: new Date().toISOString(),
    totalTimeAllowed: 120, // 2 hours
    remainingTime: 65, // 65 minutes remaining
    logs: [
      {
        id: 'log-1',
        timestamp: submission.loginTime || '2024-12-26T10:00:00Z',
        activity: 'Student logged in successfully',
        type: 'login',
        details: 'Login from IP: 192.168.1.100'
      },
      {
        id: 'log-2',
        timestamp: submission.startTime || '2024-12-26T10:05:00Z',
        activity: 'Exam started',
        type: 'start',
        details: 'All questions loaded successfully'
      },
      {
        id: 'log-3',
        timestamp: '2024-12-26T10:30:00Z',
        activity: 'Answered question 10',
        type: 'submit',
        details: 'Progress saved automatically'
      },
      {
        id: 'log-4',
        timestamp: '2024-12-26T10:45:00Z',
        activity: 'Answered question 15',
        type: 'submit',
        details: 'Progress saved automatically'
      }
    ]
  };
};

// Mock exam info
export const mockExamInfo = {
  id: 'exam-general-science',
  name: 'General Science Exam',
  startTime: '2024-12-26T10:00:00Z',
  endTime: '2024-12-26T12:00:00Z',
  duration: 120,
  totalQuestions: 20
};

// Mock summary data
export const mockSubmissionsSummary = {
  totalExaminees: mockExamineeSubmissions.length,
  present: mockExamineeSubmissions.filter(e => e.status === 'Present').length,
  absent: mockExamineeSubmissions.filter(e => e.status === 'Absent').length,
  completed: mockExamineeSubmissions.filter(e => e.status === 'Student Submission').length,
  inProgress: mockExamineeSubmissions.filter(e => e.status === 'Present' || e.status === 'Pending').length
};

// Get mock submissions response
export const getMockSubmissionsResponse = (): SubmissionsResponse => ({
  submissions: mockExamineeSubmissions,
  total: mockExamineeSubmissions.length,
  examInfo: mockExamInfo,
  summary: mockSubmissionsSummary
});

// Filter functions
export const filterSubmissionsByArea = (submissions: ExamineeSubmission[], areaId: string) => {
  return submissions.filter(submission => submission.areaId === areaId);
};

export const filterSubmissionsByGroups = (submissions: ExamineeSubmission[], groupIds: string[]) => {
  return submissions.filter(submission => groupIds.includes(submission.groupId));
};

export const filterSubmissionsBySearch = (submissions: ExamineeSubmission[], search: string) => {
  const searchLower = search.toLowerCase();
  return submissions.filter(submission => 
    submission.username.toLowerCase().includes(searchLower) ||
    submission.fullName.toLowerCase().includes(searchLower)
  );
};

export const filterSubmissionsByStatus = (submissions: ExamineeSubmission[], status: string) => {
  if (status === 'All') return submissions;
  if (status === 'Active') return submissions.filter(s => s.status === 'Present' || s.status === 'Pending');
  if (status === 'Completed') return submissions.filter(s => s.status === 'Student Submission');
  if (status === 'Issues') return submissions.filter(s => s.status === 'Absent' || s.status === 'Auto Locked');
  return submissions;
}; 