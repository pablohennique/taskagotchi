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
      setMessage(response.error + " Please try again.");
    } else if (response.success) {
      // message for successful login to the user
      setMessage(response.message);
      // first timout allow the user to read the login message before being redirected
      setTimeout(() => {
        router.push("/tamagotchis");
        // second timout reloads the entire page so that nav bar can be updated
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 1000);
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
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
