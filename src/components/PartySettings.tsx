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

      setSuccess("Party settings updated successfully! 🎉");
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border-2 border-purple-100 dark:border-purple-900">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">⚙️</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Party Settings</h2>
      </div>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center">
            <span className="text-xl mr-2">😅</span>
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="p-4 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center">
            <span className="text-xl mr-2">🎉</span>
            <span>{success}</span>
          </div>
        )}
        
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <span className="mr-2">🎪</span>
            Party Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            placeholder="Enter a fun party name!"
            disabled={loading}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <span className="mr-2">🎮</span>
            Party Settings
          </label>
          <div className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hostParticipates"
                checked={hostParticipates}
                onChange={(e) => setHostParticipates(e.target.checked)}
                className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                disabled={loading}
              />
              <label htmlFor="hostParticipates" className="text-sm text-gray-700 dark:text-gray-300">
                Join the fun as host! 🎭
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="playerLimit" className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <span className="mr-2">👥</span>
                Player Limit (optional)
              </label>
              <input
                id="playerLimit"
                type="number"
                min="1"
                value={playerLimit || ''}
                onChange={(e) => setPlayerLimit(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="No limit - the more the merrier!"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="missionHandling" className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <span className="mr-2">🎯</span>
                Mission Style
              </label>
              <select
                id="missionHandling"
                value={missionHandling}
                onChange={(e) => setMissionHandling(e.target.value as 'repeat' | 'generate' | 'custom')}
                className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                disabled={loading}
              >
                <option value="repeat">🔄 Repeat missions if needed</option>
                <option value="generate">✨ Generate new missions</option>
                <option value="custom">🎨 Allow custom missions</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Updating... ⏳" : "Save Changes ✨"}
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Deleting... ⏳" : "Delete Party 🗑️"}
          </button>
        </div>
      </form>
    </div>
  );
} 