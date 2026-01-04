export const SYSTEM_LIST_IDS = {
  COMPLETED: -1,
  TODAY: -2,
  BASKET: -3,
  ALL: -4,
} as const;

export const LIST_ICONS = [
  'DEFAULT', 'INBOX', 'ALL', 'TODAY', 'COMPLETED', 
  'BASKET', 'LINES', 'SHEET', 'FOLDER', 'CASE'
] as const;

export const LIST_COLORS = [
  'LIGHT', 'RED', 'BLUE', 'YELLOW', 'VIOLET', 'GREEN', 'NONE'
] as const;