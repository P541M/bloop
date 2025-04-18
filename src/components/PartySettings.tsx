"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PartySettingsProps {
  party: {
    id: string;
    name: string;
    host_participates: boolean;
    player_limit: number | null;
    mission_handling: 'repeat' | 'generate' | 'custom';
  };
  isHost: boolean;
}

export default function PartySettings({ party, isHost }: PartySettingsProps) {
  const router = useRouter();
  const [name, setName] = useState(party.name);
  const [hostParticipates, setHostParticipates] = useState(party.host_participates);
  const [playerLimit, setPlayerLimit] = useState<number | null>(party.player_limit);
  const [missionHandling, setMissionHandling] = useState<'repeat' | 'generate' | 'custom'>(party.mission_handling);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/parties/${party.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          hostParticipates,
          playerLimit,
          missionHandling,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update party");
      }

      setSuccess("Party settings updated successfully!");
      router.refresh();
    } catch (err) {
      console.error("Error updating party:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this party? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/parties/${party.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete party");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error deleting party:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  if (!isHost) {
    return null;
  }

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Edit Party Settings</h2>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">
            {success}
          </div>
        )}
        
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Party Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter party name"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Party Settings
          </label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hostParticipates"
                checked={hostParticipates}
                onChange={(e) => setHostParticipates(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <label htmlFor="hostParticipates" className="text-sm">
                Participate as host
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="playerLimit" className="text-sm">
                Player Limit (optional)
              </label>
              <input
                id="playerLimit"
                type="number"
                min="1"
                value={playerLimit || ''}
                onChange={(e) => setPlayerLimit(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No limit"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="missionHandling" className="text-sm">
                Mission Handling
              </label>
              <select
                id="missionHandling"
                value={missionHandling}
                onChange={(e) => setMissionHandling(e.target.value as 'repeat' | 'generate' | 'custom')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="repeat">Repeat missions if needed</option>
                <option value="generate">Generate new missions</option>
                <option value="custom">Allow custom missions</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Party"}
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete Party"}
          </button>
        </div>
      </form>
    </div>
  );
} 