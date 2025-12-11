"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.replace("/auth/login");
      } else {
        setUserEmail(user.email ?? null);
      }

      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-slate-200">Loading...</p>
      </div>
    );
  }

  if (!userEmail) {
    return null; // redirecting
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">Bet With Friends</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p className="text-slate-300 mb-2">
          Welcome! This will eventually show:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Your bets for tonight</li>
          <li>Friend activity like “Tom1112 is riding Oklahoma ML tonight, care to tail?”</li>
          <li>Links to drink tracker & live scores</li>
        </ul>
      </main>
    </div>
  );
}
