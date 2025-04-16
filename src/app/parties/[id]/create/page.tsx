"use client";
import { useRouter } from "next/navigation";

export default function CreateParty() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as any).name.value;
    const missions = (e.target as any).missions.value
      .split("\n")
      .filter((m: string) => m.trim());
    const res = await fetch("/api/parties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, missions }),
    });
    const party = await res.json();
    router.push(`/parties/${party.id}`);
  };

  return (
    <div className="min-h-screen p-4">
      <h1>Create a Party</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Party Name"
          className="border p-2 w-full"
        />
        <textarea
          name="missions"
          placeholder="Missions (one per line)"
          className="border p-2 w-full h-32"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Party
        </button>
      </form>
    </div>
  );
}
