import type { Assessment, Examinee } from '../types/data';

export const sortAssessmentsByDate = (
  a: Assessment, 
  b: Assessment, 
  dateField: 'assessmentStartDate' | 'assessmentEndDate',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const dateA = new Date(a[dateField]).getTime();
  const dateB = new Date(b[dateField]).getTime();
  
  const result = dateA - dateB;
  return order === 'desc' ? -result : result;
};

export const sortAssessmentsByText = (
  a: Assessment, 
  b: Assessment, 
  textField: 'assessmentName' | 'areaName' | 'program' | 'course',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[textField].localeCompare(b[textField]);
  return order === 'desc' ? -result : result;
};

export const sortExamineesByStatus = (
  a: Examinee, 
  b: Examinee, 
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a.status.localeCompare(b.status);
  return order === 'desc' ? -result : result;
};

export const sortExamineesByTimeElapsed = (
  a: Examinee, 
  b: Examinee, 
  order: 'asc' | 'desc' = 'asc'
): number => {
  const timeToMinutes = (timeStr: string): number => {
    if (timeStr === '-' || timeStr === 'N/A') return -1;
    
    let totalMinutes = 0;
    
    const hrMatch = timeStr.match(/(\d+)\s*hr/);
    const minMatch = timeStr.match(/(\d+)\s*min/);
    const secMatch = timeStr.match(/(\d+)\s*secs?/);
    
    if (hrMatch) totalMinutes += parseInt(hrMatch[1]) * 60;
    if (minMatch) totalMinutes += parseInt(minMatch[1]);
    if (secMatch) totalMinutes += parseInt(secMatch[1]) / 60;
    
    return totalMinutes;
  };

  const result = timeToMinutes(a.timeElapsed) - timeToMinutes(b.timeElapsed);
  return order === 'desc' ? -result : result;
};

export const sortExamineesByNumeric = (
  a: Examinee, 
  b: Examinee, 
  numericField: 'questionsSynced',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[numericField] - b[numericField];
  return order === 'desc' ? -result : result;
};

export const sortExamineesByText = (
  a: Examinee, 
  b: Examinee, 
  textField: 'username' | 'fullName' | 'groupName',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[textField].localeCompare(b[textField]);
  return order === 'desc' ? -result : result;
}; 