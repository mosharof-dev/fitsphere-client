"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function TokenProvider() {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleToken = async () => {
      // If user is logged in, but we haven't generated the custom token in this browser session
      if (session?.user?.email && !sessionStorage.getItem("custom_jwt_generated")) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jwt/sign`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email }),
            credentials: "include",
          });
          sessionStorage.setItem("custom_jwt_generated", "true");
        } catch (error) {
          console.error("Failed to generate custom token", error);
        }
      }
    };

    // If user logs out, clear the session storage flag so it generates again on next login
    if (!isPending && !session?.user) {
      sessionStorage.removeItem("custom_jwt_generated");
    }

    if (!isPending && session?.user) {
      handleToken();
    }
  }, [session, isPending]);

  return null;
}
