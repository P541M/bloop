import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import MissionCard from "@/components/MissionCard";
import Leaderboard from "@/components/Leaderboard";

// Define types for our data
interface Party {
  id: string;
  name: string;
  party_code: string;
  status: string;
  created_at: string;
}

interface Mission {
  id: string;
  description: string;
  points: number;
  status: "pending" | "completed" | "failed";
  due_date?: string;
}

interface LeaderboardEntry {
  username: string;
  points: number;
  avatarUrl?: string;
}

interface User {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
}

interface Session {
  user?: User;
}

interface LeaderboardData {
  users: {
    name: string | null;
  } | null;
  points: number;
}

interface AssignmentData {
  id: string;
  missions: {
    id: string;
    description: string;
    points: number;
  } | null;
  status: string;
  due_date: string;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions) as Session;
  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="mb-6">Please log in to view your dashboard.</p>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Get user ID from session
  const userId = session.user.id || session.user.email;

  const { data: parties } = await supabase
    .from("parties")
    .select("*")
    .eq("host_id", userId);

  const { data: assignments } = await supabase
    .from("assignments")
    .select("id, missions(id, description, points), status, due_date")
    .eq("user_id", userId);

  const { data: leaderboardData } = await supabase
    .from("completions")
    .select("users(name), points")
    .order("points", { ascending: false })
    .limit(10);

  // Format leaderboard data for our component
  const leaderboardEntries: LeaderboardEntry[] = (leaderboardData as unknown as LeaderboardData[])?.map(entry => ({
    username: entry.users?.name || "Anonymous",
    points: entry.points,
    // Add avatar URL if available
    avatarUrl: undefined
  })) || [];

  // Convert assignments data for mission cards
  const missionCards: Mission[] = (assignments as unknown as AssignmentData[])?.map(assignment => ({
    id: assignment.id,
    description: assignment.missions?.description || "No description",
    points: assignment.missions?.points || 0,
    status: (assignment.status || 'pending') as "pending" | "completed" | "failed",
    due_date: assignment.due_date
  })) || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          href="/parties/create" 
          className="btn btn-primary"
        >
          Create New Party
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Parties</h2>
          {parties && parties.length > 0 ? (
            <div className="space-y-4">
              {parties.map((party: Party) => (
                <Link 
                  key={party.id} 
                  href={`/parties/${party.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{party.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Code: {party.party_code}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-lg border border-gray-200">
              <p className="text-muted-foreground mb-4">You haven't created any parties yet.</p>
              <Link 
                href="/parties/create" 
                className="btn btn-outline"
              >
                Create Your First Party
              </Link>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Missions</h2>
          {missionCards.length > 0 ? (
            <div className="space-y-4">
              {missionCards.map((mission) => (
                <MissionCard 
                  key={mission.id}
                  description={mission.description}
                  points={mission.points}
                  status={mission.status}
                  dueDate={mission.due_date}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-lg border border-gray-200">
              <p className="text-muted-foreground">You don't have any active missions.</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <Leaderboard entries={leaderboardEntries} />
      </div>
    </div>
  );
}
