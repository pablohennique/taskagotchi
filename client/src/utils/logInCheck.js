import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/auth";

export default function logInCheck(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      const userLoggedIn = auth();

      // If not authenticated, redirect to the login page
      if (!userLoggedIn) {
        router.push("/users/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
