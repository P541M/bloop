import NextAuth, { NextAuthOptions, User, Account, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/db";
import bcrypt from "bcrypt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
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
    error: "/login", // Error code passed in query string as ?error=
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // If the user signs in with Google, check if they exist in our database
      if (account?.provider === "google") {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();
        
        // If user doesn't exist, create them
        if (!data) {
          const { data: newUser } = await supabase.from("users").insert({
            email: user.email,
            name: user.name,
            // For Google users, we don't have a password, so we'll use a placeholder
            // In a real app, you might want to handle this differently
            password: bcrypt.hashSync("google-auth-" + Math.random().toString(36).substring(2, 15), 10),
          }).select().single();
          
          // Update the user object with the new ID
          if (newUser) {
            user.id = newUser.id;
          }
        } else {
          // Update the user object with the existing ID
          user.id = data.id;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
