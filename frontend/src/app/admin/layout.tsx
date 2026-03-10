// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    redirect(`/${process.env.ADMIN_SECRET_PATH}/login`);
  }

  return (
    <>
      <style>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #07070f;
        }
        .admin-main {
          flex: 1;
          margin-left: 220px;
          transition: margin-left 0.25s cubic-bezier(0.4,0,0.2,1);
          min-height: 100vh;
        }
      `}</style>
      <div className="admin-shell">
        <AdminSidebar email={session.user?.email ?? ""} />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </>
  );
}