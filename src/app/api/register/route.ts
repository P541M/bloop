import { NextResponse } from 'next/server';
import { supabase } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    
    // Hash password on the server side
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into database
    const { data, error } = await supabase
      .from("users")
      .insert({ email, password: hashedPassword, name })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 