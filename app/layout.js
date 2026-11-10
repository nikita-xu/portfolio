import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Nikita Xu",
    template: "%s | Nikita Xu",
  },
  description: "Nikita Xu — personal portfolio website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <div className="site">
          <Navbar />
          <main className="main">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
