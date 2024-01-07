import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portilio",
  description: "Navigate through portfolios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="data-theme">
            <main className="m-auto min-w-[300px] max-w-7xl p-4">
              <NavBar />
              {children}
              <Footer />
            </main>
            <ToastContainer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
