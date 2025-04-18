"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";
import { QRCodeCanvas } from "qrcode.react";

export default function MissionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user
        const session = await getSession();
        if (!session?.user?.id) {
          setError("Please log in to view missions");
          setLoading(false);
          return;
        }
        
        setUserId(session.user.id);
        
        // Get party ID from query params
        const partyIdParam = searchParams.get("party");
        if (partyIdParam) {
          setPartyId(partyIdParam);
        }
        
        // Fetch mission details
        const { data, error } = await supabase
          .from("missions")
          .select("*")
          .eq("id", params.id)
          .single();
          
        if (error) throw error;
        setMission(data);
      } catch (err) {
        console.error("Error fetching mission:", err);
        setError("Failed to load mission");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.id, searchParams]);

  const handleAssignMission = async () => {
    if (!userId || !partyId || !mission) return;
    
    try {
      setLoading(true);
      
      // Check if user already has an assignment for this party
      const { data: existingAssignment, error: checkError } = await supabase
        .from("assignments")
        .select("*")
        .eq("party_id", partyId)
        .eq("user_id", userId)
        .single();
        
      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }
      
      if (existingAssignment) {
        setError("You already have a mission for this party");
        setLoading(false);
        return;
      }
      
      // Create assignment
      const { error: assignmentError } = await supabase
        .from("assignments")
        .insert({
          party_id: partyId,
          user_id: userId,
          mission_id: mission.id,
          status: "pending",
          due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        });
        
      if (assignmentError) throw assignmentError;
      
      setSuccess("Mission assigned successfully! Check your dashboard to see your mission.");
      setShowQRCode(true);
    } catch (err) {
      console.error("Error assigning mission:", err);
      setError("Failed to assign mission");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="p-4 text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Mission not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">Your Mission</h1>
          
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-lg font-medium">{mission.description}</p>
            <p className="text-muted-foreground mt-1">{mission.points || 10} points</p>
          </div>
          
          {success ? (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400">
              <p>{success}</p>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-muted-foreground mb-4">
                This mission will be assigned to you for the party. You'll have 24 hours to complete it.
              </p>
              <button
                onClick={handleAssignMission}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Assigning..." : "Accept Mission"}
              </button>
            </div>
          )}
          
          {showQRCode && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Complete Your Mission</h2>
              <div className="flex items-center justify-center mb-4">
                <QRCodeCanvas
                  value={`${window.location.origin}/verify/${mission.id}?party=${partyId}&user=${userId}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-center text-muted-foreground">
                Scan this QR code when you've completed your mission to verify it
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 