import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { assignment_id, evidence_url } = await req.json();
  const { data, error } = await supabase
    .from("completions")
    .insert({ assignment_id, evidence_url, points: 10 })
    .select()
    .single();

  if (error) return new Response("Completion failed", { status: 500 });
  return Response.json(data);
}
