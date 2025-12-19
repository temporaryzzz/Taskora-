/**
 * System list IDs for Taskora application.
 * These are special lists that are not created by users but provided by the system.
 * Using negative IDs to avoid conflicts with user-created lists (which have positive IDs).
 */

export const SYSTEM_LIST_IDS = {
  COMPLETED: -1,
  TODAY: -2,
  BASKET: -3,
  ALL: -4,
} as const;

/** Array of all system list IDs for quick checks */
export const SYSTEM_LIST_ID_VALUES = Object.values(SYSTEM_LIST_IDS);

/** Type for system list ID keys */
export type SystemListIdKey = keyof typeof SYSTEM_LIST_IDS;

/**
 * Check if a list ID is a system list
 */
export const isSystemListId = (id:-1 | -2 | -3 | -4): boolean => {
  return SYSTEM_LIST_ID_VALUES.includes(id);
};

/**
 * Get system list ID by name
 */
export const getSystemListId = (name: SystemListIdKey): number => {
  return SYSTEM_LIST_IDS[name];
};
