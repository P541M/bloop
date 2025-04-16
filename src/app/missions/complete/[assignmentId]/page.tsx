// src/app/missions/complete/[assignmentId]/page.tsx
import { supabase } from "@/lib/db";

export default function CompleteMission({
  params,
}: {
  params: { assignmentId: string };
}) {
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    const evidence = (e.target as any).evidence.files[0];
    const { data } = await supabase.storage
      .from("evidence")
      .upload(`evidence/${Date.now()}`, evidence);
    await supabase.from("completions").insert({
      assignment_id: params.assignmentId,
      evidence_url: data?.path,
    });
  };

  return (
    <div className="min-h-screen p-4">
      <form onSubmit={handleComplete} className="space-y-4">
        <input type="file" name="evidence" className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">
          Complete Mission
        </button>
      </form>
    </div>
  );
}
