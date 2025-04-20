"use client";

import { useAuth } from "@/context/auth";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.name || "User"}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
