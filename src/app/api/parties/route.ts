import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name, missions } = await req.json();
  const partyCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data: party, error: partyError } = await supabase
    .from("parties")
    .insert({
      name,
      host_id: session.user.id,
      party_code: partyCode,
      status: "active",
    })
    .select()
    .single();

  if (partyError) return new Response("Party creation failed", { status: 500 });

  const missionInserts = missions.map((desc: string) => ({
    description: desc,
    host_id: session.user.id,
    is_custom: true,
  }));
  const { error: missionError } = await supabase
    .from("missions")
    .insert(missionInserts);

  if (missionError)
    return new Response("Mission creation failed", { status: 500 });

  return Response.json(party);
}
