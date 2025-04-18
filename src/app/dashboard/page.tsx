import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import MissionCard from "@/components/MissionCard";
import Leaderboard from "@/components/Leaderboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
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

  const { data: parties } = await supabase
    .from("parties")
    .select("*")
    .eq("host_id", session.user.id);

  const { data: assignments } = await supabase
    .from("assignments")
    .select("id, missions(id, description, points), status, due_date")
    .eq("user_id", session.user.id);

  const { data: leaderboardData } = await supabase
    .from("completions")
    .select("users(name), points")
    .order("points", { ascending: false })
    .limit(10);

  // Format leaderboard data for our component
  const leaderboardEntries = leaderboardData?.map(entry => ({
    username: entry.users.name,
    points: entry.points,
    // Add avatar URL if available
    avatarUrl: undefined
  })) || [];

  // Convert assignments data for mission cards
  const missionCards = assignments?.map(assignment => ({
    id: assignment.id,
    description: assignment.missions.description,
    points: assignment.missions.points,
    status: assignment.status || 'pending',
    dueDate: assignment.due_date
  })) || [];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {session.user.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content - left 2/3 on desktop */}
        <div className="md:col-span-2 space-y-6">
          {/* Missions section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Missions</h2>
              <Link href="/missions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            {missionCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missionCards.slice(0, 4).map((mission) => (
                  <MissionCard
                    key={mission.id}
                    description={mission.description}
                    status={mission.status as any}
                    points={mission.points}
                    dueDate={mission.dueDate}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">You don't have any missions yet.</p>
                <Link href="/missions/browse" className="mt-3 inline-block text-blue-600 hover:text-blue-800">
                  Browse available missions
                </Link>
              </div>
            )}
          </section>

          {/* Parties section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Parties</h2>
              <Link href="/parties/create" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded">
                Create Party
              </Link>
            </div>

            {parties && parties.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {parties.map((party) => (
                    <li key={party.id}>
                      <Link href={`/parties/${party.id}`} className="block hover:bg-gray-50 transition-colors">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{party.name}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {new Date(party.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-600 line-clamp-1">{party.description || 'No description'}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">You haven't created any parties yet.</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - right 1/3 on desktop */}
        <div className="space-y-6">
          {/* Leaderboard section */}
          <section>
            <Leaderboard entries={leaderboardEntries} />
          </section>

          {/* Quick stats section */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-blue-600 text-2xl font-bold">
                  {missionCards.filter(m => m.status === 'completed').length}
                </p>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-yellow-600 text-2xl font-bold">
                  {missionCards.filter(m => m.status === 'pending').length}
                </p>
                <p className="text-gray-600 text-sm">In Progress</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-green-600 text-2xl font-bold">
                  {missionCards.reduce((sum, mission) => 
                    mission.status === 'completed' ? sum + mission.points : sum, 0
                  )}
                </p>
                <p className="text-gray-600 text-sm">Points</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-purple-600 text-2xl font-bold">
                  {parties?.length || 0}
                </p>
                <p className="text-gray-600 text-sm">Parties</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
