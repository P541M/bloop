// src/app/parties/[id]/reveal/page.tsx
import { supabase } from "@/lib/db";

export default async function RevealPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: party } = await supabase
    .from("parties")
    .select("*")
    .eq("id", params.id)
    .single();
  if (party.status !== "ended") return <p>Party not ended yet!</p>;

  const { data: completions } = await supabase
    .from("completions")
    .select("assignments(missions(description), users(name)), evidence_url");

  return (
    <div className="min-h-screen p-4">
      <h1>Party Reveal</h1>
      {completions?.map((c) => (
        <div key={c.id}>
          <p>
            {c.assignments.users.name}: {c.assignments.missions.description}
          </p>
          {c.evidence_url && <img src={c.evidence_url} alt="Evidence" />}
        </div>
      ))}
    </div>
  );
}
