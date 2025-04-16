// src/app/parties/create/page.tsx
import { supabase } from "@/lib/db";

export default function CreateParty() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as any).name.value;
    const missions = (e.target as any).missions.value.split("\n");
    await fetch("/api/parties", {
      method: "POST",
      body: JSON.stringify({ name, missions }),
    });
  };

  return (
    <div className="min-h-screen p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Party Name" className="border p-2" />
        <textarea
          name="missions"
          placeholder="Missions (one per line)"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Party
        </button>
      </form>
    </div>
  );
}
