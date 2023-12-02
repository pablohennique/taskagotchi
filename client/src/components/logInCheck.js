import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function logInCheck(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      const token = localStorage.getItem("accessToken");

      // If not authenticated, redirect to the login page
      if (!token) {
        router.push("/users/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
