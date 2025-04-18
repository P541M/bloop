"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";
import { QRCodeCanvas } from "qrcode.react";

interface Mission {
  id: string;
  description: string;
  points: number;
  is_custom: boolean;
  host_id: string;
}

interface MissionManagerProps {
  partyId: string;
  isHost: boolean;
}

export default function MissionManager({ partyId, isHost }: MissionManagerProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMission, setNewMission] = useState("");
  const [preMadeMissions, setPreMadeMissions] = useState<string[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user
        const session = await getSession();
        if (session?.user?.id) {
          setUserId(session.user.id);
        }

        // Fetch party missions
        const { data: partyMissions, error: missionsError } = await supabase
          .from("missions")
          .select("*")
          .eq("host_id", session?.user?.id);

        if (missionsError) throw missionsError;
        setMissions(partyMissions || []);

        // Fetch pre-made missions
        const response = await fetch("/api/missions");
        const preMade = await response.json();
        setPreMadeMissions(preMade);
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError("Failed to load missions");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMission.trim() || !userId) return;

    try {
      setLoading(true);
      const response = await fetch("/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: newMission.trim(),
          host_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add mission");
      }

      const data = await response.json();
      setMissions([...missions, data]);
      setNewMission("");
    } catch (err) {
      console.error("Error adding mission:", err);
      setError("Failed to add mission");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
    setShowQRCode(true);
  };

  const handleGenerateMission = () => {
    if (preMadeMissions.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * preMadeMissions.length);
    const generatedMission = preMadeMissions[randomIndex];
    
    setNewMission(generatedMission);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Missions</h2>
        
        {isHost && (
          <form onSubmit={handleAddMission} className="mb-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="mission" className="block text-sm font-medium mb-1">
                  New Mission
                </label>
                <div className="flex space-x-2">
                  <input
                    id="mission"
                    type="text"
                    value={newMission}
                    onChange={(e) => setNewMission(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a new mission"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateMission}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                disabled={!newMission.trim()}
              >
                Add Mission
              </button>
            </div>
          </form>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Missions</h3>
          {missions.length === 0 ? (
            <p className="text-muted-foreground">You haven't created any missions yet.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {missions.map((mission) => (
                <div 
                  key={mission.id}
                  className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
                >
                  <p className="font-medium">{mission.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {mission.points || 10} points
                    </span>
                    <button
                      onClick={() => handleSelectMission(mission)}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Distribute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showQRCode && selectedMission && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Distribute Mission</h2>
          <div className="mb-4">
            <p className="font-medium text-lg">{selectedMission.description}</p>
            <p className="text-muted-foreground">{selectedMission.points || 10} points</p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <QRCodeCanvas
              value={`${window.location.origin}/missions/${selectedMission.id}?party=${partyId}`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-center text-muted-foreground">
            Scan this QR code to assign this mission to a player
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowQRCode(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 