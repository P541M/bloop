"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function CreatePartyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          missions: [], // You can add default missions or make this configurable
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create party");
      }

      const data = await response.json();
      router.push(`/parties/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Party</h1>
        
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Party Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="input"
                placeholder="Enter party name"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating..." : "Create Party"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 