const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost");

export const URLEnum = {
  // --- AUTH ---
  LOGIN_LOCAL: `${BASE_URL}/auth/login?provider=LOCAL`,
  LOGIN_GOOGLE: `${BASE_URL}/auth/login?provider=GOOGLE`,
  LOGIN_GITHUB: `${BASE_URL}/auth/login?provider=GITHUB`,
  CSRF: `${BASE_URL}/auth/csrf`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  REGISTER_LOCAL: `${BASE_URL}/auth/registration?provider=LOCAL`,
  CONFIRM: `${BASE_URL}/auth/continue`,
  LOGOUT: `${BASE_URL}/auth/logout`,

  // --- NOTIFICATIONS ---
  NOTIFICATION: `${BASE_URL}/notification/one`,
  NOTIFICATION_ALL: `${BASE_URL}/notification/all`,

  // --- USER ---
  ME: `${BASE_URL}/user/me`,
  ADDITION: `${BASE_URL}/user/additional`,
  CHANGE_USER_AVATAR: `${BASE_URL}/user/avatar`,
  CHANGE_USERNAME: `${BASE_URL}/user/username`,
  USER_PUBLIC: `${BASE_URL}/user/public`,

  // --- ADMIN ---
  ADMIN_USER: `${BASE_URL}/user/users/`,
  CHANGE_USER_ROLE: `${BASE_URL}/user/role`,

  // --- COMPETITION ---
  COMPETITION_PRIVATE: `${BASE_URL}/competition/private/`,
  COMPETITION_PUBLIC_LIST: `${BASE_URL}/competition/public/page/`,
  COMPETITION_PUBLIC_SINGLE: `${BASE_URL}/competition/public/single/`,
  COMPETITION_CREATE: `${BASE_URL}/competition/create`,
  COMPETITION_DELETE: `${BASE_URL}/competition/delete/`,
  COMPETITION_PUBLISH: `${BASE_URL}/competition/publish/`,
  COMPETITION_SCHEDULE: `${BASE_URL}/competition/schedule/set/`,
  COMPETITION_UPDATE: `${BASE_URL}/competition/update/`,
  COMPETITION_SETTINGS: `${BASE_URL}/competition/settings/`,

  // --- TEAMS ---
  CREATE_TEAM: `${BASE_URL}/teams`,
  PATCH_TEAM: `${BASE_URL}/teams/`,
  MY_TEAMS: `${BASE_URL}/teams/me/`,
  TEAM_BY_ID: `${BASE_URL}/teams/`,
  TEAM_MEMBERS: `${BASE_URL}/teams/`,
  TEAM_MEMBER_BY_ID: `${BASE_URL}/teams/`,
  TEAM_CAPTAIN: `${BASE_URL}/teams/`,
  TEAM_REGISTRATION: `${BASE_URL}/teams/`,
  TEAM_ACCEPT_INVITE: `${BASE_URL}/teams/`,

  // --- ROUNDS & TASKS ---
  ROUND_CREATE: `${BASE_URL}/round/create`,
  ROUND_DELETE: `${BASE_URL}/round`,
  ROUND_PATCH: `${BASE_URL}/round`,
  TASK_CREATE: `${BASE_URL}/task`,
  TASK_DELETE: `${BASE_URL}/task`,

  // --- SUBMISSIONS & SCORES ---
  SUBMISSION_CREATE: `${BASE_URL}/submission/create`,
  SUBMISSION_FIND: `${BASE_URL}/submission/find`,
  SUBMISSION_UPDATE: `${BASE_URL}/submission/update`,
  SUBMISSION_DELETE: `${BASE_URL}/submission/delete`,
  SCORE_CREATE: `${BASE_URL}/score/create`,
  ROUND_REVIEW_CREATE: `${BASE_URL}/round_review/create`,

  // --- NOTIFICATIONS & WS ---
  GET_WS_TOKEN: `${BASE_URL}/ws/token`,
  NOTIFICATION_PAGE: `${BASE_URL}/notification/`,
  NOTIFICATION_READ_ONE: `${BASE_URL}/notification/one/`,
  NOTIFICATION_READ_ALL: `${BASE_URL}/notification/all`,

  // --- FILES ---
  UPLOAD_FILE: `${BASE_URL}/file/upload/`,
  GET_FILE_LINK: `${BASE_URL}/file/link/`,
  USER: `${BASE_URL}/user/`,
  FILE: `${BASE_URL}/file/`,
} as const;
export default URLEnum;
