// src/app/parties/[id]/page.tsx
import { supabase } from "@/lib/db";
import QRCode from "qrcode.react";

export default async function PartyPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: party } = await supabase
    .from("parties")
    .select("*")
    .eq("id", params.id)
    .single();
  const { data: assignments } = await supabase
    .from("assignments")
    .select("missions(description)")
    .eq("party_id", params.id);

  return (
    <div className="min-h-screen p-4">
      <h1>{party.name}</h1>
      <p>Join Code: {party.party_code}</p>
      <QRCode value={`http://your-app-url/parties/${party.id}`} />
      <p>
        Your Mission:{" "}
        {assignments?.[0]?.missions.description || "Join to get one!"}
      </p>
    </div>
  );
}
