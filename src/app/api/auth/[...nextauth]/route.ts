import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials?.email)
          .single();
        if (
          data &&
          bcrypt.compareSync(credentials?.password || "", data.password)
        ) {
          return { id: data.id, name: data.name, email: data.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Add to .env.local
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
