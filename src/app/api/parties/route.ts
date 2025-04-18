import { supabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user: User;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { name, missions = [] } = await req.json();
    if (!name) {
      return Response.json({ error: "Party name is required" }, { status: 400 });
    }

    if (!session.user.id) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const partyCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // First, check if the user exists in the database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", session.user.id)
      .single();

    // If user doesn't exist and we have their email, create them
    if ((userError || !userData) && session.user.email) {
      const { data: newUser, error: createUserError } = await supabase
        .from("users")
        .upsert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || "Anonymous",
        })
        .select()
        .single();
        
      if (createUserError) {
        console.error("Error creating/updating user:", createUserError);
        return Response.json({ error: "Failed to create/update user account" }, { status: 500 });
      }
      
      console.log("Created/updated user:", newUser);
    }

    const { data: party, error: partyError } = await supabase
      .from("parties")
      .insert({
        name,
        host_id: session.user.id,
        party_code: partyCode,
        status: "active",
      })
      .select()
      .single();

    if (partyError) {
      console.error("Party creation error details:", JSON.stringify(partyError, null, 2));
      return Response.json({ error: `Party creation failed: ${partyError.message}` }, { status: 500 });
    }

    // Only create missions if there are any
    if (missions.length > 0) {
      const missionInserts = missions.map((desc: string) => ({
        description: desc,
        host_id: session.user.id,
        is_custom: true,
      }));
      
      const { error: missionError } = await supabase
        .from("missions")
        .insert(missionInserts);

      if (missionError) {
        console.error("Mission creation error:", missionError);
        return Response.json({ error: "Mission creation failed" }, { status: 500 });
      }
    }

    return Response.json(party);
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
