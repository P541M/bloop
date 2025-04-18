"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";

export default function VerifyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mission, setMission] = useState<any>(null);
  const [assignment, setAssignment] = useState<any>(null);

  useEffect(() => {
    async function verifyMission() {
      try {
        // Get current user
        const session = await getSession();
        if (!session?.user?.id) {
          setError("Please log in to verify missions");
          setLoading(false);
          return;
        }

        const userId = session.user.id;
        const partyId = searchParams.get("party");
        const missionId = params.id;

        if (!partyId || !missionId) {
          setError("Invalid verification link");
          setLoading(false);
          return;
        }

        // Fetch mission details
        const { data: missionData, error: missionError } = await supabase
          .from("missions")
          .select("*")
          .eq("id", missionId)
          .single();

        if (missionError) throw missionError;
        setMission(missionData);

        // Fetch assignment
        const { data: assignmentData, error: assignmentError } = await supabase
          .from("assignments")
          .select("*")
          .eq("party_id", partyId)
          .eq("user_id", userId)
          .eq("mission_id", missionId)
          .single();

        if (assignmentError) throw assignmentError;
        setAssignment(assignmentData);

        // Update assignment status
        const { error: updateError } = await supabase
          .from("assignments")
          .update({ status: "completed" })
          .eq("id", assignmentData.id);

        if (updateError) throw updateError;

        setSuccess("Mission completed successfully! You earned " + (missionData.points || 10) + " points!");
      } catch (err) {
        console.error("Error verifying mission:", err);
        setError("Failed to verify mission completion");
      } finally {
        setLoading(false);
      }
    }

    verifyMission();
  }, [params.id, searchParams]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">Mission Verification</h1>
          
          {success ? (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400">
              <p>{success}</p>
            </div>
          ) : null}
          
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-lg font-medium">{mission?.description}</p>
            <p className="text-muted-foreground mt-1">{mission?.points || 10} points</p>
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
    </div>
  );
} 