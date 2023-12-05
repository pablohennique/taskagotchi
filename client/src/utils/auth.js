export function auth() {
  const token = localStorage.getItem("accessToken");
  return !!token;
}
