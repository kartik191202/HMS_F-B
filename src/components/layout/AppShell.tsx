// import { Header } from "./Header";
// import { Sidebar } from "./Sidebar";

// export function AppShell({ children }: { children: React.ReactNode }) { 
//     return <div className="flex min-h-screen flex-col">
//                 <Header />
//                 <div className="flex flex-1">
//                     <Sidebar />
//                         <main className="flex-1 p-6">
//                             {children}
//                         </main>
//                 </div>
//             </div>; 
//         }

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthLoading, user, pathname, router]);

  if (isAuthLoading || (!user && pathname !== "/login")) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
