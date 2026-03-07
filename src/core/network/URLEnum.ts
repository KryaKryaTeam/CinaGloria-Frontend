enum URLEnum {
  BASE_URL = "https://bots.swedka121.com/app/v1",
  LOGIN_LOCAL = `${BASE_URL}/auth/login?provider=LOCAL`,
  CSRF = `${BASE_URL}/auth/csrf`,
  REFRESH = `${BASE_URL}/auth/refresh`,
  GET_WS_TOKEN = `${BASE_URL}/ws/token`,
}
export default URLEnum;
