"use client";

import { useState } from "react";
import { loginRegisterFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + "/users/login";

    const response = await loginRegisterFetchCall({
      url: url,
      email: email,
      password: password,
    });

    if (!response.success) {
      setMessage("Login failed. Please try again. " + response.error);
    } else if (response.success) {
      setMessage(response.message);
      setTimeout(() => {
        router.push("/tamagotchis");
      }, 2000);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <p>{message}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
