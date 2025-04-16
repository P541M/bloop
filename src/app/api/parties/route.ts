// src/app/api/parties/route.ts
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name, missions } = await req.json();
  const partyCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data: party } = await supabase
    .from("parties")
    .insert({
      name,
      host_id: session.user.id,
      party_code: partyCode,
      status: "active",
    })
    .select()
    .single();

  await supabase.from("missions").insert(
    missions.map((desc: string) => ({
      description: desc,
      host_id: session.user.id,
      is_custom: true,
    }))
  );

  return Response.json(party);
}
