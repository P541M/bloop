"use client";
import { supabase } from "@/lib/db";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import PartySettings from "@/components/PartySettings";

export default function PartyPage() {
  const params = useParams();
  const [party, setParty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  
  // Get the party ID from the URL params
  const partyId = params?.id as string;

  useEffect(() => {
    if (!partyId) {
      setError("Party ID not found");
      setLoading(false);
      return;
    }

    async function fetchParty() {
      try {
        const { data, error } = await supabase
          .from("parties")
          .select("*")
          .eq("id", partyId)
          .single();

        if (error) throw error;
        setParty(data);
        
        // Check if current user is the host
        const session = await getSession();
        if (session?.user?.id) {
          setIsHost(data.host_id === session.user.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load party");
      } finally {
        setLoading(false);
      }
    }

    fetchParty();
  }, [partyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive bg-destructive/10 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Party not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{party.name}</h1>
        
        {isHost && <PartySettings party={party} isHost={isHost} />}
        
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Party Code</h2>
          <div className="flex items-center justify-center mb-4">
            <QRCodeCanvas
              value={`${window.location.origin}/parties/${party.id}?code=${party.party_code}`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-center text-muted-foreground">
            Share this code with your friends to join the party
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Party Settings</h2>
          <div className="space-y-4">
            <div>
              <span className="font-medium">Host Participation:</span>{" "}
              <span className="capitalize">
                {party.host_participates ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="font-medium">Player Limit:</span>{" "}
              <span>
                {party.player_limit ? `${party.player_limit} players` : "No limit"}
              </span>
            </div>
            <div>
              <span className="font-medium">Mission Handling:</span>{" "}
              <span className="capitalize">
                {party.mission_handling === 'repeat' && "Repeat missions if needed"}
                {party.mission_handling === 'generate' && "Generate new missions"}
                {party.mission_handling === 'custom' && "Allow custom missions"}
              </span>
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              <span className="capitalize">{party.status}</span>
            </div>
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(party.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
