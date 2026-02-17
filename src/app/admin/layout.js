import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;

  // 1. Check if user is logged in
  if (!user) {
    redirect('/sign-in'); // Middleware should handle this, but double safety
  }

  // 2. Check if user is the Admin
  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (userEmail !== adminEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4 font-helvetica">403 - Forbidden</h1>
        <p className="text-white/60 mb-8 max-w-md">
          You are logged in as <strong>{userEmail}</strong>, but you do not have administrative privileges.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-white text-black font-orbitron text-sm uppercase tracking-widest rounded hover:bg-gray-200 transition-colors"
        >
          Return Home
        </a>
      </div>
    );
  }

  // 3. Render Admin Content
  return (
    <>
      {children}
    </>
  );
}
