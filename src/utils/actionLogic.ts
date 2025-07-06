import type { ExamineeStatus } from '../types/data';

export interface ActionOption {
  key: string;
  label: string;
  danger?: boolean;
  disabled?: boolean;
}

/**
 * Determines which actions are available for an examinee based on their status
 * @param status - The current status of the examinee
 * @returns Array of available action options
 */
export const getActionsForStatus = (status: ExamineeStatus): ActionOption[] => {
  switch (status) {
    case 'Absent':
      return [
        {
          key: 'switchToPaper',
          label: 'Switch to Paper',
          danger: false
        }
      ];

    case 'Student Submission':
      return [
        {
          key: 'resetTimer',
          label: 'Reset Session Timer',
          danger: false
        },
        {
          key: 'restart',
          label: 'Restart Session',
          danger: true
        }
      ];

    case 'Auto Locked':
      return [
        {
          key: 'unlock',
          label: 'Unlock Session',
          danger: false
        }
      ];

    case 'Not Started':
      return [
        {
          key: 'start',
          label: 'Start Session',
          danger: false
        }
      ];

    case 'Pending':
      return [
        {
          key: 'viewDetails',
          label: 'View Details',
          danger: false
        }
      ];

    case 'Moved to Paper':
      // No actions available for examinees who have moved to paper
      return [];

    default:
      return [
        {
          key: 'viewDetails',
          label: 'View Details',
          danger: false
        }
      ];
  }
};

/**
 * Checks if any actions are available for the given status
 * @param status - The current status of the examinee
 * @returns True if actions are available, false otherwise
 */
export const hasActionsForStatus = (status: ExamineeStatus): boolean => {
  return getActionsForStatus(status).length > 0;
};

/**
 * Gets the primary action for a given status (first action in the list)
 * @param status - The current status of the examinee
 * @returns The primary action option or null if no actions available
 */
export const getPrimaryActionForStatus = (status: ExamineeStatus): ActionOption | null => {
  const actions = getActionsForStatus(status);
  return actions.length > 0 ? actions[0] : null;
};

/**
 * Checks if a specific action is available for the given status
 * @param status - The current status of the examinee
 * @param actionKey - The action key to check
 * @returns True if the action is available, false otherwise
 */
export const isActionAvailableForStatus = (status: ExamineeStatus, actionKey: string): boolean => {
  const actions = getActionsForStatus(status);
  return actions.some(action => action.key === actionKey);
}; 