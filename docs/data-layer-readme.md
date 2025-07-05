# Data Layer Documentation

## Overview

The Invigilator Assessment Hub uses a unified, hierarchical data structure that serves as the single source of truth for the entire application. This document provides a comprehensive guide to understanding the data layer architecture, types, and implementation.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [TypeScript Interfaces](#typescript-interfaces)
- [Data Structure](#data-structure)
- [Mock Data Implementation](#mock-data-implementation)
- [Data Flow](#data-flow)
- [Usage Examples](#usage-examples)
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

### Key Principles

1. **Single Source of Truth**: All assessment and examinee data is contained within the `Assessment[]` array
2. **Nested Structure**: Examinees belong to assessments, maintaining referential integrity
3. **Complete Data**: Each examinee object contains ALL required data for both table and modal views
4. **Type Safety**: Strict TypeScript interfaces ensure data consistency

## TypeScript Interfaces

### Assessment Status Types

```typescript
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
```

### Log Entry Interface

```typescript
/**
 * Defines a single entry in an examinee's activity log.
 * As seen in the modal popup in the video.
 */
export interface LogEntry {
  timestamp: string;
  activity: 'Login' | 'Logout' | 'Submission' | 'Warning' | 'Action';
  details: string;
}
```

### Examinee Interface

```typescript
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
```

### Assessment Interface

```typescript
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
   - 8 examinees with all possible statuses
   - Central campus location
   - Mixed grade levels (9A, 9B, 9C)

2. **ASMT002**: "Random exam- normal -campus" (Ongoing)
   - 4 examinees in various states
   - Active examination scenario
   - Different platforms and devices

3. **ASMT003**: "May 2025 media test for ACU exam" (Finished)
   - Completed examination
   - Mix of successful and absent students
   - Historical data example

4. **ASMT004**: "English Literature Final" (Closed)
   - North campus location
   - Grade 8 students
   - Post-examination state

5. **ASMT005**: "Mathematics Advanced Placement" (Ongoing)
   - South campus
   - Grade 12 advanced students
   - Single examinee scenario

6. **ASMT006**: "Physics Lab Practical Exam" (Not Started)
   - East campus
   - Grade 11 students
   - Future examination

### Sample Examinee Data

```typescript
{
  id: 'SA-010',
  username: 'student.one',
  fullName: 'abd el rahman farag',
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

1. **Data Loading**: Mock data is imported from `src/services/mockData.ts`
2. **Assessment List**: Displayed in `AssessmentsPage` with calculated examinee counts
3. **Assessment Selection**: User clicks "Monitor Examinees" to view submissions
4. **Examinee Table**: Shows all examinees for selected assessment
5. **Examinee Details**: Modal popup shows detailed information and activity timeline

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

## Usage Examples

### Getting Assessment Data

```typescript
import { mockAssessmentsData } from '../services/mockData';

// Get all assessments
const assessments = mockAssessmentsData;

// Get specific assessment
const assessment = mockAssessmentsData.find(a => a.id === 'ASMT001');

// Get examinee count
const count = assessment?.examinees.length || 0;
```

### Filtering Examinees

```typescript
// Filter by status
const submittedExaminees = assessment.examinees.filter(
  e => e.status === 'Student Submission'
);

// Filter by group
const group9A = assessment.examinees.filter(
  e => e.groupName === '9A'
);

// Search by name or username
const searchResults = assessment.examinees.filter(e =>
  e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  e.username.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Rendering Dynamic Actions

```typescript
const renderActionButton = (examinee: Examinee) => {
  switch (examinee.status) {
    case 'Absent':
      return <Button onClick={() => switchToPaper(examinee)}>Switch to Paper</Button>;
    case 'Auto Locked':
      return <Button onClick={() => unlockSession(examinee)}>Unlock Session</Button>;
    case 'Not Started':
      return <Button onClick={() => startExam(examinee)}>Start</Button>;
    case 'Student Submission':
      return <ActionsDropdown examinee={examinee} />;
    default:
      return <Button onClick={() => viewDetails(examinee)}>View Details</Button>;
  }
};
```

## Edge Cases & Testing

### Status Coverage

The mock data includes comprehensive coverage of all possible scenarios:

- ✅ **All Assessment Statuses**: Not Started, Ongoing, Finished, Closed
- ✅ **All Examinee Statuses**: Student Submission, Pending, Auto Locked, Absent, Moved to Paper, Not Started
- ✅ **Platform Diversity**: Android, iOS, Windows, macOS, N/A
- ✅ **Session Health States**: Good, Excellent, Needs Attention, Average normal session, N/A
- ✅ **Time Formats**: "41 secs", "1 min, 31 secs", "2 hr, 15 min", "-"

### Edge Case Scenarios

1. **Zero Examinees**: Some assessments may have no enrolled students
2. **Single Examinee**: Assessments with only one student
3. **Large Groups**: Assessments with many examinees for performance testing
4. **Mixed Statuses**: Single assessment with examinees in all possible states
5. **Network Issues**: Examinees with connectivity problems
6. **Device Variety**: Different platforms and technical setups

### Data Validation

```typescript
// Validate assessment structure
const validateAssessment = (assessment: Assessment): boolean => {
  return !!(
    assessment.id &&
    assessment.assessmentName &&
    assessment.examinees &&
    Array.isArray(assessment.examinees)
  );
};

// Validate examinee data
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

## Benefits of This Architecture

1. **Maintainability**: Single source of truth eliminates data inconsistencies
2. **Type Safety**: TypeScript interfaces prevent runtime errors
3. **Scalability**: Hierarchical structure supports complex organizational needs
4. **Testability**: Comprehensive mock data enables thorough testing
5. **Performance**: Efficient filtering and sorting with proper data structure
6. **Flexibility**: Easy to extend with new fields or status types

---

*This documentation reflects the current implementation as of the latest data layer update. For technical questions or clarifications, refer to the TypeScript interfaces in the codebase.* 