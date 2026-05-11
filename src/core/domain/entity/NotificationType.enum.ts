enum NotificationIcons {
  // Statuses & Important (for rules)
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  QUESTION = "QUESTION", // For FAQ or conditions
  EXCLAMATION = "EXCLAMATION", // Emphasis on an important rule

  // Restrictions & Permissions
  LOCK = "LOCK", // Restricted access
  UNLOCK = "UNLOCK", // Open access
  PROHIBITED = "PROHIBITED", // "Forbidden" (circle with a line)
  CHECK_CIRCLE = "CHECK_CIRCLE", // "Allowed" or "Completed"
  EYE = "EYE", // Rule visibility
  EYE_OFF = "EYE_OFF", // Hidden content

  // Lists & Structure
  LIST = "LIST",
  GAVEL = "GAVEL", // "Judge's hammer" — perfect for a "Legal Rules" section
  FILE_TEXT = "FILE_TEXT", // Documentation
  CLIPBOARD = "CLIPBOARD", // Registration requirements
  BOOK = "BOOK", // Guide or knowledge base

  // Time & Deadlines
  CLOCK = "CLOCK", // Time restrictions
  CALENDAR = "CALENDAR", // Stage dates
  HOURGLASS = "HOURGLASS", // Waiting process

  // Interaction & Users
  USERS = "USERS", // Team rules
  USER_CHECK = "USER_CHECK", // Participant requirements
  MESSAGES = "MESSAGES", // Communication or chat
  SHARE = "SHARE", // Referral rules

  // Rewards & Motivation
  TROPHY = "TROPHY", // Prize pool
  STAR = "STAR", // Special conditions / Favorites
  GIFT = "GIFT", // Bonuses
  MEDAL = "MEDAL", // Participant ranks

  // Technical / Gamification
  CODE = "CODE", // Rules for developers / API
  CPU = "CPU", // Hardware technical requirements
  GLOBE = "GLOBE", // Regional restrictions
  LIGHTBULB = "LIGHTBULB", // Tips or hints
}
export enum NotificationStatus {
  readed = "READED",
  sended = "SENDED",
}
export default NotificationStatus;
