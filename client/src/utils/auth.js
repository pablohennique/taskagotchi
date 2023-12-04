import { useEffect } from "react";

export function auth() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
  }, []);

  return !!token;
}
