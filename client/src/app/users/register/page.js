"use client";
import { loginRegisterFetchCall } from "@/lib/backend";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + "/users/register";
    const response = await loginRegisterFetchCall({
      url: url,
      username: username,
      email: email,
      password: password,
    });

    if (!response.success) {
      setMessage(response.error + " Please try again.");
    } else if (response.success) {
      setMessage(response.message);
      setTimeout(() => {
        router.push("/tamagotchis");
      }, 2000);
    }
  };

  return (
    <>
      <h1>Create an Account</h1>
      <div>
        <p>{message}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
}
