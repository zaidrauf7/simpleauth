"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      </div>
      
      <Link href="/dashboard/products">Manage Products</Link>
    </div>
  );
}