// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Hospital Management System",
//   description: "Hospital management frontend",
// };

// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Hospital Management System",
  description: "Hospital management frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}