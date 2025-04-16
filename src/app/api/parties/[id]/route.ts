import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { party_code } = await req.json();
  const { data: party } = await supabase
    .from("parties")
    .select("*")
    .eq("id", params.id)
    .eq("party_code", party_code)
    .single();

  if (!party) return new Response("Invalid party code", { status: 404 });

  const { data: missions } = await supabase
    .from("missions")
    .select("id")
    .eq("host_id", party.host_id);

  const missionId = missions?.[Math.floor(Math.random() * missions.length)]?.id;
  await supabase.from("assignments").insert({
    party_id: params.id,
    user_id: session.user.id,
    mission_id: missionId,
  });

  return new Response("Joined party", { status: 200 });
}
