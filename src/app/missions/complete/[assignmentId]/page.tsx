"use client";
import { supabase } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function CompleteMission({
  params,
}: {
  params: { assignmentId: string };
}) {
  const router = useRouter();

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    const evidence = (e.target as any).evidence.files[0];
    const { data } = await supabase.storage
      .from("evidence")
      .upload(`evidence/${Date.now()}`, evidence);
    await fetch("/api/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignment_id: params.assignmentId,
        evidence_url: data?.path,
      }),
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen p-4">
      <h1>Complete Your Mission</h1>
      <form onSubmit={handleComplete} className="space-y-4">
        <input type="file" name="evidence" className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">
          Complete Mission
        </button>
      </form>
    </div>
  );
}
