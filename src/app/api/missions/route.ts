import { supabase } from "@/lib/db";

const PRE_MADE_MISSIONS = [
  "Make someone laugh out loud",
  "Start a spontaneous dance-off",
  "Get a group photo with three people wearing hats",
];

export async function GET() {
  return Response.json(PRE_MADE_MISSIONS);
}

export async function POST(req: Request) {
  const { description, host_id } = await req.json();
  const { data, error } = await supabase
    .from("missions")
    .insert({ description, host_id, is_custom: true })
    .select()
    .single();
  if (error) return new Response("Mission creation failed", { status: 500 });
  return Response.json(data);
}
