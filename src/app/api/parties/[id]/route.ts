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
  
  // Get party details including settings
  const { data: party, error: partyError } = await supabase
    .from("parties")
    .select("*")
    .eq("id", params.id)
    .eq("party_code", party_code)
    .single();

  if (partyError || !party) {
    return new Response("Invalid party code", { status: 404 });
  }

  // Check if party has reached player limit
  if (party.player_limit) {
    const { count } = await supabase
      .from("assignments")
      .select("*", { count: "exact", head: true })
      .eq("party_id", params.id);

    if (count && count >= party.player_limit) {
      return new Response("Party has reached maximum player limit", { status: 400 });
    }
  }

  // Get available missions based on party settings
  let missionQuery = supabase
    .from("missions")
    .select("id, description")
    .eq("host_id", party.host_id);

  if (!party.host_participates) {
    // If host doesn't participate, exclude their missions
    missionQuery = missionQuery.neq("host_id", party.host_id);
  }

  const { data: missions, error: missionsError } = await missionQuery;

  if (missionsError || !missions || missions.length === 0) {
    return new Response("No missions available", { status: 400 });
  }

  // Select a mission based on party settings
  let selectedMission;
  if (party.mission_handling === 'repeat') {
    // Randomly select from available missions
    selectedMission = missions[Math.floor(Math.random() * missions.length)];
  } else if (party.mission_handling === 'generate') {
    // TODO: Implement mission generation logic
    // For now, just use a random mission
    selectedMission = missions[Math.floor(Math.random() * missions.length)];
  } else {
    // Custom missions - use the first available mission
    selectedMission = missions[0];
  }

  // Create assignment
  const { error: assignmentError } = await supabase
    .from("assignments")
    .insert({
      party_id: params.id,
      user_id: session.user.id,
      mission_id: selectedMission.id,
    });

  if (assignmentError) {
    return new Response("Failed to create assignment", { status: 500 });
  }

  return new Response("Joined party", { status: 200 });
}
