enum URLEnum { 
    BASE_URL = "https://bots.swedka121.com/app/v1",
    LOGIN_LOCAL = `${BASE_URL}/auth/login?provider=LOCAL&status=writepasscrtf`,
    CSRF = `${BASE_URL}/auth/csrf`
}
export default URLEnum;
