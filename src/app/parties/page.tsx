"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";
import PartyList from "@/components/PartyList";

export default function PartiesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [joinedParties, setJoinedParties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJoinedParties() {
      try {
        const session = await getSession();
        if (!session?.user?.id) {
          setLoading(false);
          return;
        }

        setUserId(session.user.id);

        // Get parties where the user is a participant (not the host)
        const { data, error } = await supabase
          .from("assignments")
          .select(`
            party_id,
            parties (
              id,
              name,
              party_code,
              status,
              created_at
            )
          `)
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        // Extract the party data from the nested structure
        const parties = data?.map(item => item.parties) || [];
        setJoinedParties(parties);
      } catch (err) {
        console.error("Error fetching joined parties:", err);
        setError("Failed to load joined parties");
      } finally {
        setLoading(false);
      }
    }

    fetchJoinedParties();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Parties</h1>
          <Link 
            href="/parties/create" 
            className="btn btn-primary"
          >
            Create New Party
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Parties You Host</h2>
            <PartyList />
          </div>

          <div className="rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Parties You've Joined</h2>
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            ) : !userId ? (
              <div className="p-4 text-center">
                <p className="text-muted-foreground mb-4">Please log in to view your joined parties.</p>
                <Link 
                  href="/login" 
                  className="btn btn-primary"
                >
                  Login
                </Link>
              </div>
            ) : joinedParties.length === 0 ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">You haven't joined any parties yet.</p>
                <p className="text-sm text-muted-foreground">
                  Ask a friend for their party code to join!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {joinedParties.map((party) => (
                  <Link 
                    key={party.id} 
                    href={`/parties/${party.id}`}
                    className="block p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{party.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Code: {party.party_code}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(party.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          party.status === 'active' ? 'bg-green-100 text-green-800' : 
                          party.status === 'ended' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {party.status.charAt(0).toUpperCase() + party.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 