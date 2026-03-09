enum URLEnum {
  BASE_URL = "https://bots.swedka121.com/app/v1",
  LOGIN_LOCAL = `${BASE_URL}/auth/login?provider=LOCAL`,
  CSRF = `${BASE_URL}/auth/csrf`,
  REFRESH = `${BASE_URL}/auth/refresh`,
  GET_WS_TOKEN = `${BASE_URL}/ws/token`,
  ME = `${BASE_URL}/user/me`,
  ADDITION = `${BASE_URL}/user/additional`,
  REGISTER_LOCAL = `${BASE_URL}/auth/registration?provider=LOCAL`,
  CONFIRM = `${BASE_URL}/auth/continue`,
}
export default URLEnum;
