"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";

export default function PartyList() {
  const [parties, setParties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParties() {
      try {
        const session = await getSession();
        if (!session?.user?.id) {
          setLoading(false);
          return;
        }

        setUserId(session.user.id);

        const { data, error } = await supabase
          .from("parties")
          .select("*")
          .eq("host_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setParties(data || []);
      } catch (err) {
        console.error("Error fetching parties:", err);
        setError("Failed to load parties");
      } finally {
        setLoading(false);
      }
    }

    fetchParties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground mb-4">Please log in to view your parties.</p>
        <Link 
          href="/login" 
          className="btn btn-primary"
        >
          Login
        </Link>
      </div>
    );
  }

  if (parties.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-muted-foreground mb-4">You haven't created any parties yet.</p>
        <Link 
          href="/parties/create" 
          className="btn btn-outline"
        >
          Create Your First Party
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parties.map((party) => (
        <Link 
          key={party.id} 
          href={`/parties/${party.id}`}
          className="card p-4 hover:shadow-md transition-shadow"
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
  );
} 