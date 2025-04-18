"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function CreatePartyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      
      if (!sessionData) {
        router.push("/login");
      }
    };
    
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!session) {
        router.push("/login");
        return;
      }

      if (!name.trim()) {
        setError("Please enter a party name");
        return;
      }

      if (!session.user || !session.user.id) {
        setError("User session is invalid. Please log in again.");
        router.push("/login");
        return;
      }

      console.log("Submitting party creation with session:", {
        userId: session.user.id,
        userName: session.user.name,
      });

      const response = await fetch("/api/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          missions: [], // You can add default missions or make this configurable
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create party");
      }

      router.push(`/parties/${data.id}`);
    } catch (err) {
      console.error("Error creating party:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="p-3 text-sm text-blue-500 bg-blue-50 rounded-md">
            Loading session...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Party</h1>
        
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter party name"
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Party"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 