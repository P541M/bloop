import { supabase } from "@/lib/db";
import bcrypt from "bcrypt";

export default function Register() {
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = bcrypt.hashSync((e.target as any).password.value, 10);
    const name = (e.target as any).name.value;
    await supabase.from("users").insert({ email, password, name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
}
