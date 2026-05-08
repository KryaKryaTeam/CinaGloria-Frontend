const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost");

export const URLEnum = {
  LOGIN_LOCAL: `${BASE_URL}/auth/login?provider=LOCAL`,
  LOGIN_GOOGLE: `${BASE_URL}/auth/login?provider=GOOGLE`,
  LOGIN_GITHUB: `${BASE_URL}/auth/login?provider=GITHUB`,
  CSRF: `${BASE_URL}/auth/csrf`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  GET_WS_TOKEN: `${BASE_URL}/ws/token`,
  ME: `${BASE_URL}/user/me`,
  ADDITION: `${BASE_URL}/user/additional`,
  REGISTER_LOCAL: `${BASE_URL}/auth/registration?provider=LOCAL`,
  CONFIRM: `${BASE_URL}/auth/continue`,
  NOTIFICATION: `${BASE_URL}/notification/one`,
  NOTIFICATION_ALL: `${BASE_URL}/notification/all`,
  NOTIFICATION_PAGE: `${BASE_URL}/notification`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  UPLOAD_FILE: `${BASE_URL}/file/upload/`,
  CHANGE_USER_AVATAR: `${BASE_URL}/user/avatar`,
  CHANGE_USERNAME: `${BASE_URL}/user/username`,
  COMPETITION: `${BASE_URL}/competition/`,
  ADMIN_USER: `${BASE_URL}/user/users/`,
  CHANGE_USER_ROLE: `${BASE_URL}/user/role`,
  CREATE_TEAM: `${BASE_URL}/teams`,
  USER: `${BASE_URL}/user/`,
  FILE: `${BASE_URL}/file/`,
  CREATE_TEAM: `${BASE_URL}/team/create`,
} as const;
export default URLEnum;
