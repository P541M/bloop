import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user: User;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as Session;
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

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

  if (partyError) return Response.json({ error: "Party creation failed" }, { status: 500 });

  const missionInserts = missions.map((desc: string) => ({
    description: desc,
    host_id: session.user.id,
    is_custom: true,
  }));
  const { error: missionError } = await supabase
    .from("missions")
    .insert(missionInserts);

  if (missionError)
    return Response.json({ error: "Mission creation failed" }, { status: 500 });

  return Response.json(party);
}
