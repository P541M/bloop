"use client";
import { supabase } from "@/lib/db";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export default function PartyPage({ params }: { params: { id: string } }) {
  const [party, setParty] = useState<any>(null);
  const [mission, setMission] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParty() {
      const { data } = await supabase
        .from("parties")
        .select("*")
        .eq("id", params.id)
        .single();
      setParty(data);
    }
    fetchParty();
  }, [params.id]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const partyCode = (e.target as any).code.value;
    const res = await fetch(`/api/parties/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ party_code: partyCode }),
    });
    if (res.ok) {
      const { data } = await supabase
        .from("assignments")
        .select("missions(description)")
        .eq("party_id", params.id)
        .single();
      setMission(data?.missions.description);
    }
  };

  if (!party) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-4">
      <h1>{party.name}</h1>
      <p>Join Code: {party.party_code}</p>
      <QRCode value={`http://localhost:3000/parties/${party.id}`} />
      {!mission ? (
        <form onSubmit={handleJoin} className="mt-4 space-y-2">
          <input
            name="code"
            placeholder="Enter Party Code"
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Join Party
          </button>
        </form>
      ) : (
        <p>Your Mission: {mission}</p>
      )}
    </div>
  );
}
