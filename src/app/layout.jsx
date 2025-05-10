import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BPS - Web",
  description: "Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="mainContainer">
      
        {children}

        </main>
      </body>
    </html>
  );
}
