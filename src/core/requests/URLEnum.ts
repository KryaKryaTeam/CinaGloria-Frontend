const BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

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
  NOTIFICATION: `${BASE_URL}/notification/`

} as const;
export default URLEnum;
