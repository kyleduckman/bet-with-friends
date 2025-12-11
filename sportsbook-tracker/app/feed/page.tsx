"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Bet = {
  id: string;
  user_email: string | null;
  user_username: string | null;
  game: string | null;
  team: string;
  bet_type: string | null;
  odds: number | null;
  stake: number | null;
  created_at: string;
};

export default function GlobalFeedPage() {
  const router = useRouter();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.replace("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("bets")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error(error);
      } else {
        setBets((data as Bet[]) || []);
      }

      setLoading(false);
    }

    loadFeed();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-slate-200">Loading feed...</p>
      </div>
    );
  }

  function tailBet(bet: Bet) {
    const params = new URLSearchParams({
      game: bet.game ?? "",
      team: bet.team,
      betType: bet.bet_type ?? "",
      odds: bet.odds !== null ? String(bet.odds) : "",
    });

    router.push(`/bets/new?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Global Bet Feed</h1>
        <button
          onClick={() => router.push("/bets/new")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          + New Bet
        </button>
      </div>

      {bets.length === 0 && (
        <p className="text-slate-300">
          No bets have been logged yet. Be the first to fire 😈
        </p>
      )}

      <div className="space-y-4">
        {bets.map((bet) => {
          const displayName = bet.user_username || "Anonymous";


          return (
            <div
              key={bet.id}
              className="bg-slate-800 rounded-lg p-4 border border-slate-700"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">{displayName}</span>{" "}
                    is riding{" "}
                    <span className="font-semibold">
                      {bet.team} {bet.bet_type}
                    </span>
                    {bet.odds !== null && (
                      <span className="ml-1 text-emerald-300">
                        ({bet.odds > 0 ? `+${bet.odds}` : bet.odds})
                      </span>
                    )}
                  </div>

                  {bet.game && (
                    <div className="text-sm text-slate-300 mb-1">
                      Game: {bet.game}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                    <div>
                      {bet.stake !== null && <span>Stake: ${bet.stake}</span>}
                    </div>
                    <div>
                      {new Date(bet.created_at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => tailBet(bet)}
                    className="bg-slate-700 hover:bg-slate-600 text-xs md:text-sm px-3 py-2 rounded-md"
                  >
                    Tail this bet
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
