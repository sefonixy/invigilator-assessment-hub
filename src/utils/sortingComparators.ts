import type { Assessment, Examinee } from '../types/data';

/**
 * Date sorting comparator for assessments
 * @param a - First assessment
 * @param b - Second assessment
 * @param dateField - Date field to sort by ('assessmentStartDate' or 'assessmentEndDate')
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
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

/**
 * Text sorting comparator for assessments
 * @param a - First assessment
 * @param b - Second assessment
 * @param textField - Text field to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
export const sortAssessmentsByText = (
  a: Assessment, 
  b: Assessment, 
  textField: 'assessmentName' | 'areaName' | 'program' | 'course',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[textField].localeCompare(b[textField]);
  return order === 'desc' ? -result : result;
};

/**
 * Status sorting comparator for examinees
 * @param a - First examinee
 * @param b - Second examinee
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
export const sortExamineesByStatus = (
  a: Examinee, 
  b: Examinee, 
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a.status.localeCompare(b.status);
  return order === 'desc' ? -result : result;
};

/**
 * Time elapsed sorting comparator for examinees
 * @param a - First examinee
 * @param b - Second examinee
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
export const sortExamineesByTimeElapsed = (
  a: Examinee, 
  b: Examinee, 
  order: 'asc' | 'desc' = 'asc'
): number => {
  // Convert time strings to minutes for sorting
  const timeToMinutes = (timeStr: string): number => {
    if (timeStr === '-' || timeStr === 'N/A') return -1;
    
    let totalMinutes = 0;
    
    // Handle new format: "41 secs", "1 min, 31 secs", "2 hr, 15 min"
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

/**
 * Numeric sorting comparator for examinees
 * @param a - First examinee
 * @param b - Second examinee
 * @param numericField - Numeric field to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
export const sortExamineesByNumeric = (
  a: Examinee, 
  b: Examinee, 
  numericField: 'questionsSynced',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[numericField] - b[numericField];
  return order === 'desc' ? -result : result;
};

/**
 * Text sorting comparator for examinees
 * @param a - First examinee
 * @param b - Second examinee
 * @param textField - Text field to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result
 */
export const sortExamineesByText = (
  a: Examinee, 
  b: Examinee, 
  textField: 'username' | 'fullName' | 'groupName',
  order: 'asc' | 'desc' = 'asc'
): number => {
  const result = a[textField].localeCompare(b[textField]);
  return order === 'desc' ? -result : result;
}; 