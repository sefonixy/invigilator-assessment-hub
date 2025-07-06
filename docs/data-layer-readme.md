# Data Layer Documentation

## Overview

This doc explains how the data layer works - the types, structure, and how to use it.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [TypeScript Interfaces](#typescript-interfaces)
- [Data Structure](#data-structure)
- [Mock Data Implementation](#mock-data-implementation)
- [Data Flow](#data-flow)
- [Edge Cases & Testing](#edge-cases--testing)

## Architecture Overview

The data layer follows a nested hierarchy:

```
Assessment (Top Level)
├── Core Assessment Data
├── Assessment Status & Metadata
└── Examinees[] (Nested Array)
    ├── Core Identification
    ├── Table View Data
    └── Modal Popup Data
```

### Notes

1. **Single Source**: All data lives in the `Assessment[]` array
2. **Nested**: Students belong to assessments
3. **Complete**: Each student has everything needed for table and modal

## TypeScript Interfaces

### Assessment Status Types

```typescript
// Assessment statuses from the exam filter
export type AssessmentStatus = 'Ongoing' | 'Not Started' | 'Finished' | 'Closed';

// Student session statuses
export type ExamineeStatus = 'Student Submission' | 'Pending' | 'Auto Locked' | 'Absent' | 'Moved to Paper' | 'Not Started';
```

### Log Entry Interface

```typescript
// Activity log entry for the student details modal
export interface LogEntry {
  timestamp: string;
  activity: 'Login' | 'Logout' | 'Submission' | 'Warning' | 'Action';
  details: string;
}
```

### Examinee Interface

```typescript
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
```

### Assessment Interface

```typescript
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
```

## Data Structure

### Hierarchical Organization

The data is organized in a tree structure:

```
Central Campus
├── Main Building
│   ├── Floor 1
│   │   ├── 9A
│   │   ├── 9B
│   │   └── 9C
│   └── Floor 2
│       ├── 10A
│       └── 10B
├── North Campus
│   └── Academic Building
│       └── Floor 3
│           ├── 8A
│           └── 8B
└── [Other Campuses...]
```

### Assessment Status Flow

```
Not Started → Ongoing → Finished → Closed
```

### Examinee Status Flow

```
Not Started → Student Submission → Pending
            → Auto Locked → [Action Required]
            → Absent → Moved to Paper
```

## Mock Data Implementation

### Assessment Examples

The mock data includes 6 comprehensive test assessments:

1. **ASMT001**: "General Science Exam - Nov ACU" (Not Started)
   - 8 students with all status types
   - Central campus, mixed grades

2. **ASMT002**: "Random exam- normal -campus" (Ongoing)
   - 4 students, active exam
   - Different devices

3. **ASMT003**: "May 2025 media test for ACU exam" (Finished)
   - Completed exam
   - Mix of submitted and absent

4. **ASMT004**: "English Literature Final" (Closed)
   - North campus, Grade 8

5. **ASMT005**: "Mathematics Advanced Placement" (Ongoing)
   - South campus, Grade 12
   - Single student

6. **ASMT006**: "Physics Lab Practical Exam" (Not Started)
   - East campus, Grade 11

### Sample Examinee Data

```typescript
{
  id: 'SA-010',
  username: 'student.one',
  fullName: 'abebe kibret',
  login: true,
  start: true,
  questionsSynced: 13,
  timeElapsed: '41 secs',
  status: 'Student Submission',
  groupName: '9A',
  platform: 'Android',
  ipAddress: '192.168.1.10',
  sessionHealth: 'Good',
  activityTimeline: [
    { 
      timestamp: '2024-11-19T13:46:00Z', 
      activity: 'Login', 
      details: 'Session started.' 
    }
  ]
}
```

## Data Flow

### Application Flow

1. **Data Loading**: Mock data from `src/services/mockData.ts`
2. **Assessment List**: Shows in `AssessmentsPage` with student counts
3. **Assessment Selection**: Click "Monitor Examinees" to view submissions
4. **Student Table**: Shows all students for selected exam
5. **Student Details**: Modal shows detailed info and activity log

### Component Data Usage

```typescript
// AssessmentsPage.tsx
const examineeCount = assessment.examinees.length; // Calculated count

// TrackSubmissionsPage.tsx
const assessment = mockAssessmentsData.find(a => a.id === assessmentId);
const examinees = assessment?.examinees || [];

// SubmissionsTable.tsx
examinees.map(examinee => renderExamineeRow(examinee));

// ExamineeDetailsModal.tsx
const { activityTimeline, sessionHealth, platform } = selectedExaminee;
```

### Filter Implementation

```typescript
// Status filtering
const filteredExaminees = examinees.filter(e => {
  switch (filterStatus) {
    case 'Active':
      return e.login && e.start && e.status !== 'Student Submission';
    case 'Completed':
      return e.status === 'Student Submission';
    case 'Pending':
      return e.status === 'Pending' || e.status === 'Not Started';
    case 'Issues':
      return e.sessionHealth.includes('Needs Attention');
  }
});
```

## Edge Cases & Testing

### Status Coverage

The mock data includes comprehensive coverage of all possible scenarios:

- ✅ **All Assessment Statuses**: Not Started, Ongoing, Finished, Closed
- ✅ **All Examinee Statuses**: Student Submission, Pending, Auto Locked, Absent, Moved to Paper, Not Started
- ✅ **Platform Diversity**: Android, iOS, Windows, macOS, N/A
- ✅ **Session Health States**: Good, Excellent, Needs Attention, Average normal session, N/A
- ✅ **Time Formats**: "41 secs", "1 min, 31 secs", "2 hr, 15 min", "-"

### Edge Cases

1. **Zero Students**: Some exams have no enrolled students
2. **Single Student**: Exams with just one student
3. **Large Groups**: Many students for performance testing
4. **Mixed Statuses**: All status types in one exam
5. **Network Issues**: Students with connection problems
6. **Device Variety**: Different platforms and setups

### Data Validation

```typescript
// Check if assessment has required fields
const validateAssessment = (assessment: Assessment): boolean => {
  return !!(
    assessment.id &&
    assessment.assessmentName &&
    assessment.examinees &&
    Array.isArray(assessment.examinees)
  );
};

// Check if student has required fields
const validateExaminee = (examinee: Examinee): boolean => {
  return !!(
    examinee.id &&
    examinee.username &&
    examinee.fullName &&
    examinee.status &&
    typeof examinee.login === 'boolean' &&
    typeof examinee.start === 'boolean'
  );
};
```

## File Locations

- **Type Definitions**: `src/types/data.ts`
- **Mock Data**: `src/services/mockData.ts`
- **Assessment Table**: `src/components/assessments/AssessmentTable.tsx`
- **Submissions Table**: `src/components/submissions/SubmissionsTable.tsx`
- **Track Submissions**: `src/components/TrackSubmissionsPage.tsx`
