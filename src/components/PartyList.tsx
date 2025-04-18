"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/db";
import { getSession } from "next-auth/react";

interface Party {
  id: string;
  name: string;
  party_code: string;
  created_at: string;
  status: 'active' | 'ended' | 'scheduled';
  attendee_count?: number;
  mission_count?: number;
}

export default function PartyList() {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch by not rendering anything on first client render
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl text-center">
        <div className="text-4xl mb-4">😅</div>
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        <p className="text-red-500 dark:text-red-300 text-sm mt-2">Don't worry, we'll get this fixed!</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
        <div className="text-4xl mb-4">🎮</div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Ready to throw an epic party?</p>
        <Link 
          href="/login" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <span className="mr-2">🚀</span>
          Let's Get Started!
        </Link>
      </div>
    );
  }

  if (parties.length === 0) {
    return (
      <div className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Parties Yet!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Time to create your first epic party!</p>
        <Link 
          href="/parties/create" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <span className="mr-2">✨</span>
          Create Your First Party
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {parties.map((party) => (
        <Link 
          key={party.id} 
          href={`/parties/${party.id}`}
          className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-purple-100 dark:border-purple-900"
        >
          <div className="relative flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                {party.name}
              </h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                party.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                party.status === 'ended' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' : 
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {party.status === 'active' ? '🎮 Active' : 
                 party.status === 'ended' ? '🏁 Ended' : 
                 '⏰ Scheduled'}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="mr-2">🎫</span>
                <span className="font-mono text-sm">Code: {party.party_code}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="mr-2">📅</span>
                <span className="text-sm">{formatDate(party.created_at)}</span>
              </div>
              
              {party.attendee_count !== undefined && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="mr-2">👥</span>
                  <span className="text-sm">{party.attendee_count} attendees</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-600 dark:text-purple-400 font-medium group-hover:underline">
                  View Party Details
                </span>
                <span className="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 