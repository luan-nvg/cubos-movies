import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN
  // withCredentials: true
})

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.authorization = `bearer ${token}`
    }

    const projectId = localStorage.getItem("projectId") // ou de onde for o projectId
    if (projectId) {
      config.headers["X-Project-ID"] = projectId // Cabeçalho customizado para o projectId
    }

    const redirect = "/login"
    const no_redirect = ["/login_first_access"]
    const pathname = window?.location?.pathname
    const valid = no_redirect.includes(pathname)

    if (window?.location?.pathname !== redirect && !valid && !token) {
      location.replace(redirect)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
