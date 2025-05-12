const onLogout = async () => {
  localStorage.removeItem("access_token")
  window.location.href = "/login"
}

export default onLogout
