import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Please log in.</p>;

  const { data: parties } = await supabase
    .from("parties")
    .select("*")
    .eq("host_id", session.user.id);

  const { data: assignments } = await supabase
    .from("assignments")
    .select("missions(description)")
    .eq("user_id", session.user.id);

  const { data: leaderboard } = await supabase
    .from("completions")
    .select("users(name), points")
    .order("points", { ascending: false });

  return (
    <div className="min-h-screen p-4">
      <h1>Dashboard</h1>
      <h2>Your Parties</h2>
      <ul>
        {parties?.map((p) => (
          <li key={p.id}>
            <a href={`/parties/${p.id}`}>{p.name}</a>
          </li>
        ))}
      </ul>
      <h2>Your Missions</h2>
      <ul>
        {assignments?.map((a, i) => (
          <li key={i}>{a.missions.description}</li>
        ))}
      </ul>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard?.map((l, i) => (
          <li key={i}>
            {l.users.name}: {l.points} points
          </li>
        ))}
      </ul>
      <a
        href="/parties/create"
        className="bg-blue-500 text-white p-2 mt-4 inline-block"
      >
        Create Party
      </a>
    </div>
  );
}
